import * as reportService from "../services/report.service.js";

export const lowStockReport = async (req, res) => {

    try {

        const report =
            await reportService.getLowStockReport();

        res.status(200).json({
            success: true,
            report,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const productSummary = async (req, res) => {

    try {

        const summary =
            await reportService.getProductSummary();

        res.status(200).json({
            success: true,
            summary,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const supplierSummary = async (req, res) => {

    try {

        const summary =
            await reportService.getSupplierSummary();

        res.status(200).json({
            success: true,
            summary,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};