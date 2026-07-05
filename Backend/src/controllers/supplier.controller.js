import * as supplierService from "../services/supplier.service.js";

export const createSupplier = async (req, res) => {

    try {

        const supplier = await supplierService.createSupplier(req.body);

        res.status(201).json({
            success: true,
            supplier,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const getSuppliers = async (req, res) => {

    try {

        const suppliers = await supplierService.getSuppliers();

        res.status(200).json({
            success: true,
            suppliers,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const getSupplierById = async (req, res) => {

    try {

        const supplier = await supplierService.getSupplierById(req.params.id);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
        }

        res.status(200).json({
            success: true,
            supplier,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const updateSupplier = async (req, res) => {

    try {

        const supplier = await supplierService.updateSupplier(
            req.params.id,
            req.body
        );

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
        }

        res.status(200).json({
            success: true,
            supplier,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const deleteSupplier = async (req, res) => {

    try {

        const supplier = await supplierService.deleteSupplier(req.params.id);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Supplier deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};