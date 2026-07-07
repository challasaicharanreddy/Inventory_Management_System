import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        sku: {
            type: String,
            required: true,
            unique: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        quantity: {
            type: Number,
            default: 0,
        },

        category: {
            type: String,
            default: "",
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
        },

        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Product", productSchema);
