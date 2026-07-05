import express from "express";

import * as productController from "../controllers/product.controller.js";

import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

export default router;