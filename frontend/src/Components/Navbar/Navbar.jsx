import React, { useEffect, useContext } from "react";
import "./Navbar.css";

import logo from "./Assets/logo.jpg";

import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import UserContext from "../../Context/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    if (token && userid) {
      axios
        .get(`${BACKEND_SERVER}/profile/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [setUser, token, userid]);

  return (
    <>
      <div className="navbar">
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="" draggable="false" />
          <h2>BlogMonk</h2>
        </Link>

        {user ? (
          <div className="right">
            <NavLink to={"/profile"} className="nav-item">
              Hey, {user.fullname.split(" ")[0]}
            </NavLink>
            <NavLink to={"/createblog"} className="nav-item">
              Add Blog
            </NavLink>
            <NavLink to={"/viewblog"} className="nav-item">
              View Blog
            </NavLink>
            <span
              style={{
                cursor: "pointer",
              }}
              className="nav-item"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Logout
            </span>
          </div>
        ) : (
          <div className="right">
            <NavLink to={"/register"} className="nav-item">
              SignUp
            </NavLink>
            <NavLink to={"/login"} className="nav-item">
              SignIn
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
