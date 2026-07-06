import express from "express";

import { inventoryLogs } from "../controllers/inventory.controller.js";

import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
    "/",
    authenticate,
    inventoryLogs
);

export default router;