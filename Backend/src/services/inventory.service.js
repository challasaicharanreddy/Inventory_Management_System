import InventoryLog from "../models/InventoryLog.js";
import { ROLES } from "../constants/roles.js";

export const getInventoryLogs = async () => {

    const logs = await InventoryLog.find()
        .populate("product", "name sku")
        .populate("updatedBy", "name email role")
        .sort({
            createdAt: -1,
        });

    // Ensure each log has updatedByRole (fallback to populated user's role)
    return logs.map((log) => {
        const obj = log.toObject ? log.toObject() : log;
        if (!obj.updatedByRole) {
            obj.updatedByRole = obj.updatedBy?.role || ROLES.EMPLOYEE;
        }
        return obj;
    });

};