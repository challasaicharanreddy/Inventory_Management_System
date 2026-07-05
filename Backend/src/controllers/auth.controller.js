import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {

    try {

        const { user, token } = await registerUser(req.body);

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            })
            .status(201)
            .json({
                success: true,
                message: "User registered successfully",
                user,
            });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const { user, token } = await loginUser(email, password);

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            })
            .status(200)
            .json({
                success: true,
                message: "Login Successful",
                user,
            });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,
        });

    }

};

export const logout = (req, res) => {

    res
        .clearCookie("token")
        .status(200)
        .json({
            success: true,
            message: "Logged out successfully",
        });

};

export const getMe = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });

};