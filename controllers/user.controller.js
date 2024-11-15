import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, profilePhoto, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and confirm password does not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists try another username" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        console.log("User created successfully");

        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.log("register error", error);
        return res.status(500).json({ message: "Register Error", error });
    }
}

export const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const tokenData = {
            userId: user._id,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePhoto: user.profilePhoto,
        });

    } catch (error) {
        console.log("login error", error);
        return res.status(500).json({ message: "Login Error", error });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', '', { maxAge: 0 }).json({ message: "Logout successfully" });
    } catch (error) {
        console.log("logout error", error);
        return res.status(500).json({ message: "Logout Error", error });
    }
}

export const getOtherUser = async (req, res) => {
    try {
        const loggedInUserId = req.id;

        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log("getOtherUser error", error);
        return res.status(500).json({ message: "getOtherUser Error", error });
    }
}