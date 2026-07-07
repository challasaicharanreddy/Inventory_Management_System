import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app = express();

/* ------------------------ Security ------------------------ */

app.use(helmet());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://YOUR-APP.vercel.app",
        ],
        credentials: true,
    })
);

/* ------------------------ Parsers ------------------------ */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/* ------------------------ Logger ------------------------ */

app.use(morgan("dev"));

/* --------------------- Rate Limiter ---------------------- */

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

/* ----------------------- Routes -------------------------- */

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/suppliers", supplierRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/inventory",inventoryRoutes);
app.use("/api/v1/reports",reportRoutes);
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Inventory Management API is running",
    });
});

export default app;