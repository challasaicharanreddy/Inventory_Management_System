import express from "express";

import {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
} from "../controllers/supplier.controller.js";

import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createSupplier);

router.get("/", getSuppliers);

router.get("/:id", getSupplierById);

router.put("/:id", updateSupplier);

router.delete("/:id", deleteSupplier);

export default router;