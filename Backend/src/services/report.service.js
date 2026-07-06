import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";

export const getLowStockReport = async () => {

    return await Product.find({
        quantity: { $lte: 10 }
    }).populate("supplier", "name email");

};

export const getProductSummary = async () => {

    const totalProducts = await Product.countDocuments();

    const totalStock = await Product.aggregate([
        {
            $group: {
                _id: null,
                totalQuantity: {
                    $sum: "$quantity"
                },
                averagePrice: {
                    $avg: "$price"
                }
            }
        }
    ]);

    return {
        totalProducts,
        totalStock:
            totalStock[0]?.totalQuantity || 0,
        averagePrice:
            totalStock[0]?.averagePrice || 0
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