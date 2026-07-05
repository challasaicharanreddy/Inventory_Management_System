import * as productService from "../services/product.service.js";

export const createProduct = async (req, res) => {

    try {

        const product = await productService.createProduct(req.body);

        res.status(201).json(product);

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }

};

export const getProducts = async (req, res) => {

    const products = await productService.getProducts();

    res.json(products);

};

export const getProductById = async (req, res) => {

    const product = await productService.getProductById(req.params.id);

    res.json(product);

};

export const updateProduct = async (req, res) => {

    const product = await productService.updateProduct(
        req.params.id,
        req.body
    );

    res.json(product);

};

export const deleteProduct = async (req, res) => {

    await productService.deleteProduct(req.params.id);

    res.json({
        message: "Product Deleted",
    });

};