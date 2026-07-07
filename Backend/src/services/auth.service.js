import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (userData) => {

    const { name, email, password, role } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    const token = generateToken(user._id);

    return {
        user,
        token,
    };

};

export const loginUser = async (email, password) => {

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    user.lastLogin = new Date();

    await user.save();

    const token = generateToken(user._id);

    return {
        user,
        token,
    };

};