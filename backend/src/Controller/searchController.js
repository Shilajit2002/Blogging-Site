// Import Blog Model
const blogModel = require("../Models/blogModel");

// Search Blog API
const searchBlog = async (req, res) => {
    try {
        const { query, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // Finding Blog Data
        const blogData = await blogModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive search by title
                { description: { $regex: query, $options: 'i' } } // Case-insensitive search by description
            ]
        }).skip(skip).limit(parseInt(limit)); // Implementing pagination

        // If data not found
        if (!blogData) {
            // Not found
            return res.status(404).json({
                msg: "No blog found."
            });
        }

        // Creating Total Pages for Blog
        const totalBlogsCount = await blogModel.countDocuments({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

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
module.exports = { searchBlog };