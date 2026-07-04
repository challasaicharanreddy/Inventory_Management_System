import express from "express";
import cors from "cors";
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);

export default app;