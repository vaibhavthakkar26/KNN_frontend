import React, { useState, useEffect } from "react";
import Adminsidebar from "../Adminsidebar";
import "jquery/dist/jquery.min.js";
import deletesvg from "../../../assets/image/delete.svg";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import CategoryService from "../../../services/category.service";
import Loaderring from "../../../comman/Loader";
import SuccessToast from "../../../comman/SuccessToast";
import ErrorToast from "../../../comman/ErrorToast";
function AdminCategorey(props) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const getAllCategory = async () => {
    setisLoading(true);
    const categoreyres = await CategoryService.getCategory("all");
    console.log("Cat in Book Js", categoreyres);
    setCategories(categoreyres.data.data);
    setisLoading(false);
  };
  useEffect(() => {
    const doFetch = async () => {
      await getAllCategory();
      $(document).ready(function () {
        $("#example").DataTable();
      });
    };
    doFetch();
  }, []);

  const onDelete = async (id) => {
    const deleteCategory = await CategoryService.deleteCategory(id);
    if (deleteCategory.status === 200) {
      SuccessToast(deleteCategory.data.message);
      window.location.reload();
    } else {
      ErrorToast(deleteCategory.data.message);
    }
  };
  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="event_btn_admin">
            <h3>Categories</h3>
            <Link to="/adminCreateCategorey">
              <button> Create Category </button>
            </Link>
          </div>
          <table
            id="example"
            class="cell-border stripe"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>No</th>
                <th>CategoryName</th>
                <th>type</th>
                {/* <th>
                  <img
                    src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/4a90e2/external-edit-interface-kiranshastry-lineal-color-kiranshastry.png"
                    alt=""
                    width="30"
                    height="30"
                  />
                </th> */}
                <th>
                  {" "}
                  <img src={deletesvg} alt="" width="30" height="30" />{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div style={{ marginLeft: "123px" }}>
                  <Loaderring />
                </div>
              ) : (
                categories.map((cat, i) => {
                  return (
                    <tr class="table-success">
                      <td> {i + 1} </td>
                      <td> {cat.categoryName} </td>
                      <td> {cat.type} </td>
                      <td>
                        {" "}
                        <button onClick={() => onDelete(cat.id)}>
                          Delete
                        </button>{" "}
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

export default AdminCategorey;
