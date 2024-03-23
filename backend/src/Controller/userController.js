// Import User Model
const userModel = require("../Models/userModel");

// Import bcryptjs
const bcryptjs = require('bcryptjs');

// Import JWT
const jwt = require('jsonwebtoken');

// Hash Converter Func
const hashConverter = async (data) => {
    // Generating the Salt
    const secureData = await bcryptjs.genSalt(Number(process.env.SALT));
    // Hashing the Data
    return bcryptjs.hash(data, secureData);
}

// Register API
const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            // Bad Request
            return res.status(400).json({ msg: "Incomplete data provided." });
        }

        // Check if user already exists
        const userData = await userModel.findOne({ email });

        if (userData) {
            // Conflict
            return res.status(409).json({ msg: "User already registered." });
        }

        // Hash Password
        const hashPassword = await hashConverter(password);

        // Create User Data
        const data = await userModel.create({ fullname, email, password: hashPassword });

        // Ok
        return res.status(201).json({ msg: "Successfully registered.", data });

    } catch (error) {
        // Status for Server Error
        return res.status(500).json({
            msg: "Internal Server Error",
            err: error.message
        });
    }
}

// Create Token Func
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY,
        {
            // Token expires by 5 days
            expiresIn: 5 * 24 * 60 * 60
        }
    );
}

// Login API
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            // Bad Request
            return res.status(400).json({ msg: "Incomplete data provided." });
        }

        // Check if user already exists
        const userData = await userModel.findOne({ email });

        // If not exists
        if (!userData) {
            // Conflict
            return res.status(409).json({ msg: "User not registered. Please SignUp" });
        }

        /* If user exists */

        // Compare the password with database password
        const comparePassword = await bcryptjs.compare(password, userData.password);

        // If the Password is wrong
        if (!comparePassword) {
            //  Not Found
            return res.status(404).json({ msg: "Password is Incorrect" });
        }

        /* If the Password is Correct */

        // Create a token by secret key
        const token = createToken(userData._id);

        // Ok
        return res.status(200).json({ token, userid: userData._id })

    } catch (error) {
        // Status for Server Error
        return res.status(500).json({
            msg: "Internal Server Error",
            err: error.message
        });
    }
}

// Profile API
const profile = async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
            // Unauthorized
            return res.status(401).json({ msg: "Unauthorized User" });
        }

        // Check if user exists
        const userData = await userModel.findById(req.params.id);

        // If not exists
        if (!userData) {
            // Conflict
            return res.status(409).json({ msg: "User not registered. Please SignUp" });
        }

        // Ok
        return res.status(200).json(userData);

    } catch (error) {
        // Status for Server Error
        return res.status(500).json({
            msg: "Internal Server Error",
            err: error.message
        });
    }
}

// Exporting All Functions
module.exports = { register, login, profile };