import mongoose from "mongoose";

const inventoryLogSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        previousQuantity: {
            type: Number,
            required: true,
        },

        newQuantity: {
            type: Number,
            required: true,
        },

        changeType: {
            type: String,
            enum: ["INCREASE", "DECREASE"],
            required: true,
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        remarks: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const InventoryLog = mongoose.model(
    "InventoryLog",
    inventoryLogSchema
);

export default InventoryLog;