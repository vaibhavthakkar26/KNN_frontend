import React, { useState, useEffect } from "react";
import UserServices from "../../../services/user.services";
import Adminsidebar from "../Adminsidebar";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Loaderring from "../../../comman/Loader";
import ErrorToast from "../../../comman/ErrorToast";
import SuccessToast from "../../../comman/SuccessToast";

function AdminUsersList(props) {
  const [newUsers, setNewUsers] = useState([]);
  const [isNewUsersLoading, setIsNewUsersLoading] = useState(false);
  const [otherUser, setOtherUser] = useState([]);

  const getAllNewUsers = async () => {
    setIsNewUsersLoading(true);
    const users = await UserServices.getNewUser(false);
    setNewUsers(users.data.data);
    const otherusers = await UserServices.getNewUser(true);
    setOtherUser(otherusers.data.data);
    setIsNewUsersLoading(false);
  };

  useEffect(() => {
    const doFetch = async () => {
      await getAllNewUsers();
      $(document).ready(function () {
        $("#example").DataTable();
      });
      $(document).ready(function () {
        $("#example2").DataTable();
      });
    };
    doFetch();
  }, []);

  const onUserSelect = async (id) => {
    console.log("id: ", id);
    props.history.push(`/adminUserDetail?id=${id}`);
  };

  const verifyUser = async (userId, isVerify) => {
    setIsNewUsersLoading(true);
    const userVerify = await UserServices.verifyUser(userId, isVerify);
    if (userVerify.status === 200) {
      SuccessToast(userVerify.data.message);
      await getAllNewUsers();
    } else {
      ErrorToast(userVerify.data.message);
      await getAllNewUsers();
    }
  };

  return (
    <div class="admin_side_main">
      <Adminsidebar />
      <div className="MainDiv">
        <div class="event_btn_admin">
          <h3>New User</h3>
        </div>
        <table id="example" class="cell-border stripe">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>EmailId</th>
              <th>Subscription Type</th>
              <th>Is Subscription Complete</th>
              <th>Is Verify</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {isNewUsersLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              newUsers.map((user, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td onClick={() => onUserSelect(user.id)}>
                      {user.firstName}
                    </td>
                    <td>{user.emailId}</td>
                    <td>
                      {user.UserSubscription.length > 0
                        ? user.UserSubscription[0].type
                        : ""}
                    </td>
                    <td>{user.isSubscriptionComplete.toString()}</td>
                    <td>{user.isVerify.toString()}</td>
                    <td>
                      <button onClick={() => verifyUser(user.id, true)}>
                        Verify
                      </button>{" "}
                      <button onClick={() => verifyUser(user.id, false)}>
                        Cancle
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <br />
        <hr />
        <br />
        <div class="event_btn_admin">
          <h3>Verifyed User</h3>
        </div>
        <table id="example2" class="cell-border stripe">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>EmailId</th>
              <th>Subscription Type</th>
              <th>Is Subscription Complete</th>
              <th>Is Verify</th>
            </tr>
          </thead>
          <tbody>
            {isNewUsersLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              otherUser.map((user, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td onClick={() => onUserSelect(user.id)}>
                      {user.firstName}
                    </td>
                    <td>{user.emailId}</td>
                    <td>
                      {user.UserSubscription.length > 0
                        ? user.UserSubscription[0].type
                        : ""}
                    </td>
                    <td>{user.isSubscriptionComplete.toString()}</td>
                    <td>{user.isVerify.toString()}</td>
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

export default AdminUsersList;
