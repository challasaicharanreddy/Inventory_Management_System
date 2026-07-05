import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false,
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.EMPLOYEE,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(
        this.password,
        Number(process.env.BCRYPT_SALT_ROUNDS)
    );

});

userSchema.methods.comparePassword = async function (
    enteredPassword
) {
    return bcrypt.compare(
        enteredPassword,
        this.password
    );
};


const User = mongoose.model("User", userSchema);

export default User;