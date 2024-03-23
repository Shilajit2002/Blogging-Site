// Import User Model
const userModel = require("../Models/userModel");
// Import Blog Model
const blogModel = require("../Models/blogModel");

// Create Blog API
const createBlog = async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
            // Unauthorized
            return res.status(401).json({ msg: "Unauthorized User" });
        }

        const user_id = req.user.id;

        // Check if user exists or not
        const userData = await userModel.findById(user_id);

        if (!userData) {
            // Not found
            return res.status(404).json({ msg: "User not found." });
        }

        const { title, description, content } = req.body;

        if (!title || !description || !content) {
            // Bad Request
            return res.status(400).json({ msg: "Incomplete data provided." });
        }

        // Create Blog
        const data = await blogModel.create({ user_id, username: userData.fullname, title, description, content });

        // Created
        return res.status(201).json({ msg: "Blog Created.", data });

    } catch (error) {
        // Status for Server Error
        return res.status(500).json({
            msg: "Internal Server Error",
            err: error.message
        });
    }
}

// Edit Blog API
const editBlog = async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
            // Unauthorized
            return res.status(401).json({ msg: "Unauthorized User" });
        }

        const user_id = req.user.id;

        // Check if user exists or not
        const userData = await userModel.findById(user_id);

        if (!userData) {
            // Not found
            return res.status(404).json({ msg: "User not found." });
        }

        if (!req.body) {
            // Bad Request
            return res.status(400).json({ msg: "Incomplete data provided." });
        }

        const { _id } = req.body;

        // Update Blog
        const blogData = await blogModel.findByIdAndUpdate(_id, req.body, { new: true });

        if (!blogData) {
            return res.status(404).json({ msg: "Blog not found." });
        }

        // Ok
        return res.status(200).json({ msg: "Blog Updated.", blogData });

    } catch (error) {
        // Status for Server Error
        return res.status(500).json({
            msg: "Internal Server Error",
            err: error.message
        });
    }
}

// Delete Blog API
const deleteBlog = async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
            // Unauthorized
            return res.status(401).json({ msg: "Unauthorized User" });
        }

        const user_id = req.user.id;

        // Check if user exists or not
        const userData = await userModel.findById(user_id);

        if (!userData) {
            // Not found
            return res.status(404).json({ msg: "User not found." });
        }

        if (!req.params.blogid) {
            // Bad Request
            return res.status(400).json({ msg: "Incomplete data provided." });
        }

        const _id = req.params.blogid;

        // Delete Blog
        const blogData = await blogModel.findByIdAndDelete(_id);

        if (!blogData) {
            return res.status(404).json({ msg: "Blog not found." });
        }

        // Ok
        return res.status(200).json({ msg: "Blog Deleted.", blogData });

    } catch (error) {
        // Status for Server Error
        return res.status(500).json({
            msg: "Internal Server Error",
            err: error.message
        });
    }
}

// Get Blog API
const getAllBlog = async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
            // Unauthorized
            return res.status(401).json({ msg: "Unauthorized User" });
        }

        const user_id = req.user.id;

        // Check if user exists or not
        const userData = await userModel.findById(user_id);

        if (!userData) {
            // Not found
            return res.status(404).json({ msg: "User not found." });
        }

        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // Finding Blog Data for perticular user
        const blogData = await blogModel.find({ user_id: user_id })
            .skip(skip)
            .limit(parseInt(limit))
            .exec();

        // If data not found
        if (!blogData) {
            // Not found
            return res.status(404).json({
                msg: "No blog found."
            });
        }

        // Creating Total Pages for Blog
        const totalBlogsCount = await blogModel.countDocuments({ user_id: user_id });

        // Ok
        return res.status(200).json({
            totalBlogs: blogData,
            totalPages: Math.ceil(totalBlogsCount / limit),
            currentPage: parseInt(page)
        });

    } catch (error) {
        // Status for Server Error
        return res.status(500).json({
            msg: "Internal Server Error",
            err: error.message
        });
    }
}

// Exporting All Functions
module.exports = { createBlog, editBlog, deleteBlog, getAllBlog };