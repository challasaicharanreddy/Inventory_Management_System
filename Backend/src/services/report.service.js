import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";

export const getLowStockReport = async () => {

    return await Product.find({
        quantity: { $lte: 10 }
    }).populate("supplier", "name email");

};

export const getProductSummary = async () => {

    const totalProducts = await Product.countDocuments();

    const stats = await Product.aggregate([
        {
            $group: {
                _id: null,
                totalQuantity: { $sum: "$quantity" },
                averagePrice: { $avg: "$price" },
                totalInventoryValue: { $sum: { $multiply: ["$quantity", "$price"] } },
            },
        },
    ]);

    return {
        totalProducts,
        totalStock: stats[0]?.totalQuantity || 0,
        averagePrice: stats[0]?.averagePrice || 0,
        totalInventoryValue: stats[0]?.totalInventoryValue || 0,
    };

};

export const getSupplierSummary = async () => {

    return await Product.aggregate([
        {
            $group: {
                _id: "$supplier",
                totalProducts: {
                    $sum: 1
                },
                totalStock: {
                    $sum: "$quantity"
                }
            }
        },
        {
            $lookup: {
                from: "suppliers",
                localField: "_id",
                foreignField: "_id",
                as: "supplier"
            }
        },
        {
            $unwind: "$supplier"
        },
        {
            $project: {
                _id: 0,
                supplierName: "$supplier.name",
                supplierEmail: "$supplier.email",
                totalProducts: 1,
                totalStock: 1
            }
        }
    ]);

};

export const getStockByCategory = async () => {
    return await Product.aggregate([
        {
            $group: {
                _id: "$category",
                totalStock: { $sum: "$quantity" },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                totalStock: 1,
                count: 1,
            },
        },
        { $sort: { totalStock: -1 } },
    ]);
};

export const getProductsBySupplier = async () => {
    return await Product.aggregate([
        {
            $group: {
                _id: "$supplier",
                productCount: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: "suppliers",
                localField: "_id",
                foreignField: "_id",
                as: "supplier",
            },
        },
        { $unwind: { path: "$supplier", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                _id: 0,
                supplierName: "$supplier.name",
                productCount: 1,
            },
        },
        { $sort: { productCount: -1 } },
    ]);
};

export const getTopStockProducts = async (limit = 5) => {
    return await Product.find()
        .sort({ quantity: -1 })
        .limit(limit)
        .select("name quantity sku category");
};