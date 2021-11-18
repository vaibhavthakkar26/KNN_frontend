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
// import { Link } from "react-router-dom";

function AdminBlogList(props) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setisLoading] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      await getAllBlogs();
    };
    fetchData();
  }, []);

  const onBlogClick = async (blogId) => {
    console.log("BlogId: ", blogId);
    props.history.push(`/admineventdetails?id=${blogId}`);
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

  return (
    <div className="admin_side_main">
      <Adminsidebar />
      <div className="MainDiv">
        <div class="event_btn_admin">
          <h3>Blogs</h3>
          {/* <Link to="/admineventcreate"> */}
          <button> Create Blog </button>
          {/* </Link> */}
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
                      <button>Edit</button>
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
    </div>
  );
}

export default AdminBlogList;
