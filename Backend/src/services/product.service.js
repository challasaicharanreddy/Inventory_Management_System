import Product from "../models/Product.js";
import InventoryLog from "../models/InventoryLog.js";

export const createProduct = async (data) => {

    return await Product.create(data);

};

export const getProducts = async (queryParams) => {

    const {
        search,
        category,
        page = 1,
        limit = 10,
        sort = "createdAt",
        order = "desc",
    } = queryParams;

    let query = {};

    // Search by product name
    if (search) {
        query.name = {
            $regex: search,
            $options: "i",
        };
    }

    // Filter by category
    if (category) {
        query.category = category;
    }

    const products = await Product.find(query)
        .populate("supplier")
        .sort({
            [sort]: order === "asc" ? 1 : -1,
        })
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const totalProducts = await Product.countDocuments(query);

    return {
        products,
        totalProducts,
        currentPage: Number(page),
        totalPages: Math.ceil(totalProducts / limit),
    };
};

export const getProductById = async (id) => {

    return await Product.findById(id).populate("supplier");

};

export const updateProduct = async (id, data) => {

    return await Product.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
        }
    );

};

export const deleteProduct = async (id) => {

    return await Product.findByIdAndDelete(id);

};

//For Inventory Logs
export const updateStock = async (
    productId,
    quantity,
    remarks,
    userId
) => {

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const previousQuantity = product.quantity;

    product.quantity = quantity;

    await product.save();

    await InventoryLog.create({
        product: product._id,
        previousQuantity,
        newQuantity: quantity,
        changeType:
            quantity > previousQuantity
                ? "INCREASE"
                : "DECREASE",
        updatedBy: userId,
        remarks,
    });

    return product;

};