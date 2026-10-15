import Department from "../models/Department.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import logActivity from "../utils/activity.js";

const listDepartments = asyncHandler(async (_req, res) => {
  const departments = await Department.find().sort({ name: 1 });
  res.json({ items: departments });
});

const createDepartment = asyncHandler(async (req, res) => {
  const department = await Department.create(req.body);
  await logActivity({
    actor: req.user._id,
    action: "created department",
    entityType: "Department",
    entityId: department._id,
    metadata: { name: department.name },
  });
  res.status(201).json(department);
});

const updateDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!department) throw new AppError("Department not found", 404);
  res.json(department);
});

export { listDepartments, createDepartment, updateDepartment };
