import express from "express";

import authenticate from "../middlewares/auth.middleware.js";

import {
    lowStockReport,
    productSummary,
    supplierSummary,
    stockByCategory,
    productsBySupplier,
    topStockProducts,
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

router.get(
    "/stock-by-category",
    stockByCategory
);

router.get(
    "/products-by-supplier",
    productsBySupplier
);

router.get(
    "/top-stock-products",
    topStockProducts
);

export default router;