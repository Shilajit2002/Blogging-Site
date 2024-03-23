import React, { useState, useEffect, useContext } from "react";

import "./Blog.css";

import UserContext from "../../Context/UserContext";

import axios from "axios";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import Skeleton from "@mui/material/Skeleton";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const Blog = () => {
  const { user, setUser, setPerBlog } = useContext(UserContext);

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

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token && userid) {
      axios
        .get(`${BACKEND_SERVER}/get-blog/${userid}?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      window.location.href = "/login";
    }
  }, [page, token, userid]);

  const generateRandomColor = () => {
    const randomColor1 =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 =
      "#" + Math.floor(Math.random() * 16777215).toString(16);

    return {
      background: `linear-gradient(45deg, ${randomColor1}, ${randomColor2})`,
    };
  };

  const deleteBlog = (_id) => {
    if (token && userid) {
      axios
        .delete(`${BACKEND_SERVER}/delete-blog/${userid}/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          //   setData(res.data);
          axios
            .get(`${BACKEND_SERVER}/get-blog/${userid}?page=${page}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setData(res.data);
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <>
      {token && userid && user && (
        <div className="blogPage">
          <div className="innerBlog">
            <h2
              style={{
                margin: "10px 0",
              }}
            >
              My Blogs
            </h2>
            {data.totalBlogs && data.totalBlogs.length !== 0 ? (
              <>
                {data.totalBlogs.map((blog, index) => (
                  <div className="cardBox" key={blog._id}>
                    <div className="box" style={generateRandomColor()}></div>
                    <div className="para">
                      <h3>{blog.title}</h3>
                      <p>{blog.description}</p>
                    </div>

                    {/* <Link to="/blog">
                      <KeyboardArrowRightIcon
                        sx={{
                          m: 1,
                        }}
                      />
                    </Link> */}
                    <Link
                      to="/editblog"
                      onClick={() => {
                        setPerBlog(blog);
                      }}
                    >
                      <ModeEditIcon
                        sx={{
                          m: 1,
                        }}
                      />
                    </Link>

                    <DeleteIcon
                      onClick={() => {
                        deleteBlog(blog._id);
                      }}
                      sx={{
                        m: 1,
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))}
                <Stack
                  spacing={2}
                  sx={{
                    m: 1,
                  }}
                >
                  <Pagination
                    count={data.totalPages}
                    page={page}
                    onChange={(e, v) => {
                      setPage(v);
                    }}
                    color="secondary"
                  />
                </Stack>
              </>
            ) : (
              <>
                {data.length !== 0 && data.totalBlogs.length === 0 ? (
                  <h3
                    style={{
                      margin: "10px 0",
                    }}
                  >
                    No blogs found `~`
                  </h3>
                ) : (
                  <>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: "80%",
                        m: 1,
                      }}
                      height={80}
                    />
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: "80%",
                        m: 1,
                      }}
                      height={80}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
