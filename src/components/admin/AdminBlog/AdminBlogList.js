import React, { useEffect, useState } from "react";
import BlogService from "../../../services/blog.services";
import Adminsidebar from "../Adminsidebar";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Loaderring from "../../../comman/Loader";
import ErrorToast from "../../../comman/ErrorToast";
import SuccessToast from "../../../comman/SuccessToast";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

function AdminBlogList(props) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isWriterLoading, setisWriterLoading] = useState(false);
  const [allBlogWriters, setAllBlogWriters] = useState([]);

  const getAllBlogs = async () => {
    setisLoading(true);
    const getblog = await BlogService.getAllBlog();
    console.log("getblog", getblog);
    setBlogs(getblog.data.data);
    setisLoading(false);
    $(document).ready(function () {
      $("#example").DataTable();
    });
  };

  const getAllBlogWriter = async () => {
    setisWriterLoading(true);
    const getBlogWriters = await BlogService.getBlogWriters();
    setAllBlogWriters(getBlogWriters.data.data);
    setisWriterLoading(false);
    $(document).ready(function () {
      $("#example2").DataTable();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllBlogs();
      await getAllBlogWriter();
    };
    fetchData();
  }, []);

  const onBlogClick = async (blogId) => {
    console.log("BlogId: ", blogId);
    // props.history.push(`/admineventdetails?id=${blogId}`);
  };

  const onDelete = async (deleteId) => {
    setisLoading(true);
    console.log("delete id", deleteId);
    const deletedBlog = await BlogService.deleteBlog(deleteId);
    if (deletedBlog.status === 200) {
      SuccessToast(deletedBlog.data.message);
    } else {
      ErrorToast(deletedBlog.data.message);
    }
    await getAllBlogs();
  };

  const onBlogEdit = async (blogId) => {
    console.log("BlogId: ", blogId);
    props.history.push(`/adminCreateblog?id=${blogId}`);
  };

  const onWriterDelete = async (deleteId) => {
    setisWriterLoading(true);
    console.log("delete id", deleteId);
    const deletedBlog = await BlogService.deleteBlogWriter(deleteId);
    if (deletedBlog.status === 200) {
      SuccessToast(deletedBlog.data.message);
    } else {
      ErrorToast(deletedBlog.data.message);
    }
    await getAllBlogWriter();
  };

  return (
    <div className="admin_side_main">
      <Adminsidebar />
      <div className="MainDiv">
        <div>
          <div class="event_btn_admin">
            <h3>Blogs</h3>
            <Link to="/adminCreateblog">
              <button> Create Blog </button>
            </Link>
            <Link to="/createblogwriter">
              <button> Create Blog Writer </button>
            </Link>
          </div>
          <table id="example" class="cell-border stripe">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>SubTitle</th>
                <th>Writer</th>
                <th>Edit </th>
                <th>Delete </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div style={{ marginLeft: "123px" }}>
                  <Loaderring />
                </div>
              ) : (
                blogs.map((res, i) => {
                  return (
                    <tr class="table-success">
                      <td>{i + 1}</td>
                      <td onClick={() => onBlogClick(res.id)}>{res.title}</td>
                      <td>{res.subTitle}</td>
                      <td>{res.BlogWriter.name}</td>
                      <td>
                        <button onClick={() => onBlogEdit(res.id)}>Edit</button>
                      </td>
                      <td>
                        <button onClick={() => onDelete(res.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <br />
        <hr />
        <br />
        <div>
          <div class="event_btn_admin">
            <h3>Blog Writers</h3>
          </div>
          <table id="example2" class="cell-border stripe">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>EmailId</th>
                <th>Designation</th>
                {/* <th>Edit </th> */}
                <th>Delete </th>
              </tr>
            </thead>
            <tbody>
              {isWriterLoading ? (
                <div style={{ marginLeft: "123px" }}>
                  <Loaderring />
                </div>
              ) : (
                allBlogWriters.map((res, i) => {
                  return (
                    <tr class="table-success">
                      <td>{i + 1}</td>
                      <td>{res.name}</td>
                      <td>{res.emailId}</td>
                      <td>{res.designation}</td>
                      {/* <td>
                        <button onClick={() => onBlogEdit(res.id)}>Edit</button>
                      </td> */}
                      <td>
                        <button onClick={() => onWriterDelete(res.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogList;
