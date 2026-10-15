import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "../utils/jwt.js";

const { verifyToken } = jwt;

export const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  const payload = verifyToken(token);
  const user = await User.findById(payload.sub).select("-passwordHash");

  if (!user || user.status !== "Active") {
    throw new AppError("User account is not active", 401);
  }

  req.user = user;
  next();
});

export const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError(
        "You do not have permission to perform this action",
        403,
      );
    }

    next();
  };
