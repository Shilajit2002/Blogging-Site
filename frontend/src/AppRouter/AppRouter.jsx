import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar";

import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";

import Profile from "../Pages/Profile/Profile";
import AddBlog from "../Pages/AddBlog/AddBlog";
import Blog from "../Pages/Blog/Blog";
import EditBlog from "../Pages/EditBlog/EditBlog";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createblog" element={<AddBlog />} />
          <Route path="/viewblog" element={<Blog />} />
          <Route path="/editblog" element={<EditBlog />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
