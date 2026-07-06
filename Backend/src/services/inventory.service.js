import InventoryLog from "../models/InventoryLog.js";

export const getInventoryLogs = async () => {

    return await InventoryLog.find()
        .populate("product", "name sku")
        .populate("updatedBy", "name email")
        .sort({
            createdAt: -1,
        });

};