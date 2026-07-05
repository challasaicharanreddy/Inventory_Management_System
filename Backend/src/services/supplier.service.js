import Supplier from "../models/Supplier.js";

export const createSupplier = async (supplierData) => {

    const existingSupplier = await Supplier.findOne({
        email: supplierData.email,
    });

    if (existingSupplier) {
        throw new Error("Supplier already exists");
    }

    return await Supplier.create(supplierData);
};

export const getSuppliers = async () => {

    return await Supplier.find();

};

export const getSupplierById = async (id) => {

    return await Supplier.findById(id);

};

export const updateSupplier = async (id, supplierData) => {

    return await Supplier.findByIdAndUpdate(
        id,
        supplierData,
        {
            new: true,
            runValidators: true,
        }
    );

};

export const deleteSupplier = async (id) => {

    return await Supplier.findByIdAndDelete(id);

};