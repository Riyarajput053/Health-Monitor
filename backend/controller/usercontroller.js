const patientModel = require("../models/patientModel.js");
const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register User
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const createUser = await userModel.create({ email, password: hashPassword });

        const token = jwt.sign({ userId: createUser._id, role: createUser.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({ success: true, message: "User created successfully", token});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await userModel.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: userExist._id, role: userExist.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: "User logged in successfully", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get Authenticated User
const GetAuthUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        // Fetch user details from DB
        const user = await userModel.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "Logged in user", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Logout User
const logout = async (req, res) => {
    try {
        res.cookie("authToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            expires: new Date(0),
        });

        return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Patient Registration
const patientInfo = async (req, res) => {
    try {
        const { firstname, lastname, email, dob, gender, contactnumber, address } = req.body;
        if (!firstname || !lastname || !dob || !gender || !contactnumber || !address || !email) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        const patientExist = await patientModel.findOne({ email });
        if (patientExist) {
            return res.status(400).json({ success: false, message: "Patient already exists" });
        }

        const createPatient = await patientModel.create({ firstname, lastname, dob, gender, contactnumber, address, email });
        const token = jwt.sign({ patientId: createPatient._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("patientAuth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({ success: true, message: "Patient registered successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { register, login, GetAuthUser, logout, patientInfo };
