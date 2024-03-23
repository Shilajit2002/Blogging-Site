// Import Mongoose
const mongoose = require('mongoose');

// Create Blog Schema
const blogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    username: {
        type: String,
        ref: "user"
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    content: {
        type: String
    }
}, { timestamps: true })

// Create Blog Collection & Export It
module.exports = mongoose.model("blog", blogSchema);