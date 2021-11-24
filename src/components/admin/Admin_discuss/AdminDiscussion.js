import React, { useEffect, useState } from "react";

import Adminsidebar from "../Adminsidebar";
import deletesvg from "../../../assets/image/delete.svg";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import DiscussionService from "../../../services/discussion.services";
import Loaderring from "../../../comman/Loader";

function AdminDiscussion(props) {
  const [allDiscussion, setAllDiscussion] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isDiscussionLoading, setisDiscussionLoading] = useState(false);

  async function getDiscus() {
    setisDiscussionLoading(true);
    const discussion = await DiscussionService.getAllDiscussion(null);
    console.log("All Discussion", discussion);
    await setAllDiscussion(discussion.data.data);
    await setisDiscussionLoading(false);
  }

  useEffect(() => {
    const doFetch = async () => {
      await getDiscus();
      $(document).ready(function () {
        $("#example").DataTable();
      });
    };
    doFetch();
  }, []);

  const onEdit = async (id) => {
    console.log("id", id);
    props.history.push(`/adminCreateDiscussion?id=${id}`);
  };
  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="event_btn_admin">
            <h3>Discussions</h3>
            <Link to="/adminCreateDiscussion">
              <button> Create Discussion </button>
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
                <th>Topic</th>
                <th>Category</th>
                <th>CreatedBy</th>
                <th>
                  <img
                    src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/4a90e2/external-edit-interface-kiranshastry-lineal-color-kiranshastry.png"
                    alt=""
                    width="30"
                    height="30"
                  />
                </th>
                {/* <th>
                  {" "}
                  <img src={deletesvg} alt="" width="30" height="30" />{" "}
                </th> */}
              </tr>
            </thead>
            <tbody>
              {isDiscussionLoading ? (
                <div style={{ marginLeft: "123px" }}>
                  <Loaderring />
                </div>
              ) : (
                allDiscussion.map((disc, i) => {
                  return (
                    <tr class="table-success">
                      <td> {i + 1} </td>
                      <td> {disc.question} </td>
                      <td> {disc.Category.categoryName} </td>
                      <td> {disc.User.firstName} </td>
                      <td>
                        {" "}
                        <button onClick={() => onEdit(disc.id)}>
                          Edit
                        </button>{" "}
                      </td>
                      {/* <td>
                        {" "}
                        <button>Delete</button>{" "}
                      </td> */}
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

export default AdminDiscussion;
