import { getInventoryLogs } from "../services/inventory.service.js";

export const inventoryLogs = async (req, res) => {

    try {

        const logs = await getInventoryLogs();

        res.status(200).json({
            success: true,
            logs,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};