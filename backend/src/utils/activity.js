import { create } from "../models/ActivityLog.js";

async function logActivity({ actor, action, entityType, entityId, metadata = {} }) {
  await create({
    actor,
    action,
    entityType,
    entityId,
    metadata,
  });
}

export default logActivity;
