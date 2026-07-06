import express from "express";

import authenticate from "../middlewares/auth.middleware.js";

import {
    lowStockReport,
    productSummary,
    supplierSummary,
} from "../controllers/report.controller.js";

const router = express.Router();

router.use(authenticate);

router.get(
    "/low-stock",
    lowStockReport
);

router.get(
    "/product-summary",
    productSummary
);

router.get(
    "/supplier-summary",
    supplierSummary
);

export default router;