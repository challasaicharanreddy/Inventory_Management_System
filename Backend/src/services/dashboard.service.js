import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";

export const getDashboardStats = async () => {

    const totalProducts = await Product.countDocuments();

    const totalSuppliers = await Supplier.countDocuments();

    const lowStockProducts = await Product.countDocuments({
        quantity: { $gt: 0, $lte: 10 },
    });

    const outOfStockProducts = await Product.countDocuments({
        quantity: 0,
    });

    const recentProducts = await Product.find()
    .sort({ createdAt: -1 })
    .limit(5);

    return {
        totalProducts,
        totalSuppliers,
        lowStockProducts,
        outOfStockProducts,
        recentProducts,
    };

};