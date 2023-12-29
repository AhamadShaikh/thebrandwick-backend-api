const express = require("express");
const User = require("../model/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const BlacklistToken = require("../model/blacklistToken")

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User has already been registered" });
        }
        

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ ...req.body, password: hashedPassword });

        res.status(201).json({ message: "User successfully registered", user: newUser });
    } catch (error) {
        console.error("Registration failed:", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

       let tokenKey = process.env.TOKEN_KEY
       let rTokenKey = process.env.RTOKEN_KEY

        const token = jwt.sign({ userId: existingUser._id, name: existingUser.username }, tokenKey, { expiresIn: "2h" });

        const refreshToken = jwt.sign({ userId: existingUser._id, name: existingUser.username }, rTokenKey, { expiresIn: "5h" });

        res.status(200).json({ message: "Login successful", token, refreshToken });
    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).json({ message: "Login failed" });
    }
});

router.post("/logout", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(400).json({ message: "Token not provided" });
        }

        const isTokenBlacklisted = await BlacklistToken.exists({ token });

        if (isTokenBlacklisted) {
            return res.status(400).json({ message: "Token has already been invalidated" });
        }

        await BlacklistToken.create({ token });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout failed:", error);
        res.status(500).json({ message: "Logout failed" });
    }
});

module.exports = router