import ActivityLog from "../models/ActivityLog.js";
import asyncHandler from "../utils/asyncHandler.js";

const listActivity = asyncHandler(async (_req, res) => {
  const items = await ActivityLog.find()
    .populate("actor", "name role")
    .sort({ createdAt: -1 })
    .limit(25);

  res.json({ items });
});

export { listActivity };
