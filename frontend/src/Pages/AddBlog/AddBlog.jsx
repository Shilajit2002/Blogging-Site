import React, { useState, useEffect, useContext } from "react";
import "./AddBlog.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import UserContext from "../../Context/UserContext";

import axios from "axios";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import { Button } from "@mui/material";

/* ------------- Alerts ------------- */
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AddBlog = () => {
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

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    content: "Something..",
  });

  // Snackbar Alert UseState
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Close SnackBar Alert Func
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack({
      ...snack,
      open: false,
    });
  };

  const handleAddBlog = (event) => {
    event.preventDefault();

    if (blog.title !== "" && blog.description !== "") {
      axios
        .post(`${BACKEND_SERVER}/create-blog/${userid}`, blog, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSnack({
            open: true,
            message: res.data.msg,
            severity: "success",
          });

          setBlog({
            title: "",
            description: "",
            content: "Something..",
          });
        })
        .catch((err) => {
          // Set Alert
          setSnack({
            open: true,
            message: err.response ? err.response.data.msg : "Server Error!!",
            severity: "error",
          });
        });
    } else {
      setSnack({
        open: true,
        message: "Enter data !!",
        severity: "warning",
      });
    }
  };

  return (
    <>
      {token && userid && user && (
        <div className="addBlogPage">
          <div className="innerBlogPage">
            <h2 style={{
              margin:"10px 0"
            }}>Create Blog</h2>
            <form onSubmit={handleAddBlog}>
              <TextField
                name="title"
                type="text"
                id="outlined-basic"
                label="Title"
                style={{
                  width: "100%",
                  margin: "5px 0",
                }}
                variant="outlined"
                color="secondary"
                value={blog.title}
                placeholder="Enter name"
                onChange={(e) => {
                  setBlog({
                    ...blog,
                    title: e.target.value,
                  });
                }}
              />

              <textarea
                placeholder="Description..."
                name="description"
                value={blog.description}
                rows="4"
                style={{
                  width: "95%",
                  resize: "vertical",
                  fontSize: "1rem",
                  padding: "10px",
                  margin: "5px 0",
                }}
                onChange={(e) => {
                  setBlog({
                    ...blog,
                    description: e.target.value,
                  });
                }}
              />

              <Button variant="contained" color="success" type="submit" sx={{
                mt:1
              }}>
                Add
              </Button>
            </form>
          </div>

          {/* Snack Bar Alert */}
          <Snackbar
            open={snack.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            {/* Mui Alert */}
            <MuiAlert
              onClose={handleClose}
              severity={snack.severity}
              sx={{ width: "100%" }}
            >
              <strong>{snack.message}</strong>
            </MuiAlert>
          </Snackbar>
        </div>
      )}
    </>
  );
};

export default AddBlog;
