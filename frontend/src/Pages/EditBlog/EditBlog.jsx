import React, { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import UserContext from "../../Context/UserContext";

import axios from "axios";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import { Button } from "@mui/material";

/* ------------- Alerts ------------- */
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EditBlog = () => {
  const { user, setUser, perBlog, setPerBlog } = useContext(UserContext);

  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    if (token && userid && perBlog) {
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
  }, [perBlog, setUser, token, userid]);

  // const [blog, setBlog] = useState({
  //   title: "",
  //   description: "",
  //   content: "Something..",
  // });

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

    if (perBlog.title !== "" && perBlog.description !== "") {
      axios
        .put(`${BACKEND_SERVER}/edit-blog/${userid}`, perBlog, {
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
      {token && userid && user && perBlog && (
        <div className="addBlogPage">
          <div className="innerBlogPage">
            <h2
              style={{
                margin: "10px 0",
              }}
            >
              Edit Blog
            </h2>
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
                value={perBlog.title}
                placeholder="Enter name"
                onChange={(e) => {
                  setPerBlog({
                    ...perBlog,
                    title: e.target.value,
                  });
                }}
              />

              <textarea
                placeholder="Description..."
                name="description"
                value={perBlog.description}
                rows="4"
                style={{
                  width: "95%",
                  resize: "vertical",
                  fontSize: "1rem",
                  padding: "10px",
                  margin: "5px 0",
                }}
                onChange={(e) => {
                  setPerBlog({
                    ...perBlog,
                    description: e.target.value,
                  });
                }}
              />

              <Button variant="contained" color="success" type="submit">
                Update
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

export default EditBlog;
