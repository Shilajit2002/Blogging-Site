import React, { useEffect, useContext } from "react";
import "./Profile.css";

import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import profilepic from "./Assets/profilepic.jpg";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import UserContext from "../../Context/UserContext";

import EmailIcon from "@mui/icons-material/Email";

const Profile = () => {
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
    } else {
      window.location.href = "/login";
    }
  }, [setUser, token, userid]);

  return (
    <>
      {token && userid && user && (
        <>
          <div className="profilePage">
            <div className="profileBox">
              <img src={profilepic} alt="profilepic" draggable="false" />
              <h2 style={{
                marginTop:"10px"
              }}>{user.fullname}</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop:"10px"
                }}
              >
                <EmailIcon sx={{ mr: 1 }} />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
