import ActivityLog from "../models/ActivityLog.js";

async function logActivity({
  actor,
  action,
  entityType,
  entityId,
  metadata = {},
}) {
  await ActivityLog.create({
    actor,
    action,
    entityType,
    entityId,
    metadata,
  });
}

export default logActivity;
