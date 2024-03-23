const router = require('express').Router();

const auth = require('../Middleware/auth');

const { register, login, profile } = require('../Controller/userController');
const { createBlog, editBlog, deleteBlog, getAllBlog } = require('../Controller/blogController');
const { searchBlog } = require('../Controller/searchController');

// Register API
router.post("/register", register);
// Login API
router.post("/login", login);
// Profile API
router.get("/profile/:id",auth, profile);

// Creating Blog API
router.post("/create-blog/:id", auth, createBlog);
// Updating Blog API
router.put("/edit-blog/:id", auth, editBlog);
// Deleting Blog API
router.delete("/delete-blog/:id/:blogid", auth, deleteBlog);
// Get Blog API
router.get("/get-blog/:id", auth, getAllBlog);

// Search Blog API
router.post("/search-blog", searchBlog);

module.exports = router;