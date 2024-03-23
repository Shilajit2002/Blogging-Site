import React, { useState } from "react";
import "./Register.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";

/* ------------- Alerts ------------- */
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Register = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [userAlert, setUserAlert] = useState({
    emailAlert: "",
    passwordAlert: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

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

  const handleRegister = (event) => {
    event.preventDefault();

    if (
      userData.fullname !== "" &&
      userData.email !== "" &&
      userData.password !== "" &&
      userAlert.emailAlert === "" &&
      userAlert.passwordAlert === ""
    ) {
      axios
        .post(`${BACKEND_SERVER}/register`, userData)
        .then((res) => {
          setSnack({
            open: true,
            message: res.data.msg,
            severity: "success",
          });

          setUserData({
            fullname: "",
            email: "",
            password: "",
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
      <div className="registerPage">
        <div className="innerRegister">
          <h1 style={{
              margin:"10px 0"
            }}>Sign Up</h1>
          <form onSubmit={handleRegister}>
            <Box
              sx={{
                m: 1,
                width: "100%",
              }}
            >
              <TextField
                name="fullname"
                type="text"
                id="outlined-basic"
                label="Full Name"
                style={{
                  width: "100%",
                }}
                variant="outlined"
                color="secondary"
                value={userData.fullname}
                placeholder="Enter name"
                onChange={handleChange}
              />
            </Box>

            <Box
              sx={{
                m: 1,
                width: "100%",
              }}
            >
              <TextField
                name="email"
                type="email"
                id="outlined-basic"
                label="Email"
                style={{
                  width: "100%",
                }}
                variant="outlined"
                color="secondary"
                value={userData.email}
                placeholder="Enter email"
                onChange={handleChange}
                onBlur={() => {
                  if (
                    !/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
                      userData.email
                    )
                  ) {
                    setUserAlert({
                      ...userAlert,
                      emailAlert: "Invalid email address.",
                    });
                  } else {
                    setUserAlert({
                      ...userAlert,
                      emailAlert: "",
                    });
                  }
                }}
              />
              <p>{userAlert.emailAlert}</p>
            </Box>

            <Box
              sx={{
                m: 1,
                width: "100%",
              }}
            >
              <TextField
                name="password"
                id="outlined-basic"
                type="password"
                label="Password"
                style={{
                  width: "100%",
                }}
                variant="outlined"
                color="secondary"
                value={userData.password}
                placeholder="Enter password"
                onChange={handleChange}
                onBlur={() => {
                  if (
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=,./<>?;:'"[\]{}|~`])(?=.{8,})/.test(
                      userData.password
                    )
                  ) {
                    setUserAlert({
                      ...userAlert,
                      passwordAlert:
                        "Password must be 8+ characters with lowercase, uppercase, number, and special character.",
                    });
                  } else {
                    setUserAlert({
                      ...userAlert,
                      passwordAlert: "",
                    });
                  }
                }}
              />
              <p>{userAlert.passwordAlert}</p>
            </Box>

            <button type="submit">SignUp</button>
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
    </>
  );
};

export default Register;
