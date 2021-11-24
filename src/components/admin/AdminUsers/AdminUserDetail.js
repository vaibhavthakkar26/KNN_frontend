import React, { useState, useEffect } from "react";
import Adminsidebar from "../Adminsidebar";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import queryString from "query-string";
import Loaderring from "../../../comman/Loader";
import SuccessToast from "../../../comman/SuccessToast";
import ErrorToast from "../../../comman/ErrorToast";
import UserServices from "../../../services/user.services";
import BookServices from "../../../services/book.services";

function AdminUserDetail(props) {
  const { id } = queryString.parse(props.location.search);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    if (id === null || id === undefined) {
      props.history.push(`/adminUserList`);
    }
    setIsLoading(true);
    const userData = await UserServices.getUserInfo(id);
    console.log("userData", userData);
    await setUser(userData.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    const doFetch = async () => {
      console.log("userData");
      await getUser();
      $(document).ready(function () {
        $("#example").DataTable();
      });
    };
    doFetch();
  }, []);

  const onStatusChange = async (bookId, changeTo) => {
    // setisLoading(true);
    // setBooks([]);
    console.log("onStatusChange", bookId, changeTo);
    const statusChange = await BookServices.bookStatusChange(bookId, changeTo);

    if (statusChange.status === 200) {
      SuccessToast(statusChange.data.message);
      // await getAllBooks();
      window.location.reload();
    } else {
      ErrorToast(statusChange.data.message);
      // await getAllBooks();
      window.location.reload();
    }
  };

  const onBookEdit = async (bookId) => {
    console.log("bookId: ", bookId);
    props.history.push(`/admincreatebook?id=${bookId}`);
  };

  return (
    <div class="admin_side_main">
      <Adminsidebar />
      <div className="MainDiv">
        <div class="event_btn_admin">
          <h3>User Details</h3>
        </div>

        {isLoading ? (
          <div style={{ marginLeft: "123px" }}>
            <Loaderring />
          </div>
        ) : (
          <div class="admin_event_">
            <div class="Details_event_main_admin">
              <div class="Image_area_event_admin">
                <img
                  src={user.profilePicture}
                  alt=""
                  width="200"
                  height="200"
                  style={{ marginTop: "50px" }}
                />
              </div>
              <div class="main_details_area_admin">
                <div class="details_one_">
                  <h2>Name</h2>
                  <p> {user.firstName}</p>
                </div>
                <div class="details_one_">
                  <h2> Mobile No.</h2>
                  <p> {user.mobileNumber} </p>
                </div>
                <div class="details_one_">
                  <h2>Email Id </h2>
                  <p> {user.emailId}</p>
                </div>
                <div class="details_one_">
                  <h2> Address</h2>
                  <p>{user.address} </p>
                </div>
                <div class="details_one_">
                  <h2> Is Subscription Completed?</h2>
                  <p>
                    {user.isSubscriptionComplete
                      ? user.isSubscriptionComplete.toString()
                      : ""}{" "}
                  </p>
                </div>
                <div class="details_one_">
                  <h2>Is Verify</h2>
                  <p>
                    {user.isVerify ? (
                      user.isVerify.toString()
                    ) : (
                      <div style={{ marginLeft: "123px" }}>
                        <Loaderring />
                      </div>
                    )}
                  </p>
                </div>
                {/* <div class="details_one_">
                  <h2> Average Rating</h2>
                  <p> {}</p>
                </div>
                <div class="details_one_">
                  <h2> Author</h2>
                  <p>{}</p>
                </div> */}
              </div>
            </div>
            <hr />
            <br />
            <div class="event_btn_admin">
              <h3>User Subscription Details</h3>
            </div>

            {user.UserSubscription && user.UserSubscription.length > 0 ? (
              <div class="Details_event_main_admin">
                <div class="main_details_area_admin">
                  <div class="details_one_">
                    <h2>Title</h2>
                    <p> {user.UserSubscription[0].title}</p>
                  </div>
                  <div class="details_one_">
                    <h2> Description</h2>
                    <p> {user.UserSubscription[0].description} </p>
                  </div>
                  <div class="details_one_">
                    <h2>Type </h2>
                    <p> {user.UserSubscription[0].type}</p>
                  </div>
                  <div class="details_one_">
                    <h2> No. of Book</h2>
                    <p>{user.UserSubscription[0].noOfBook}</p>
                  </div>
                  <div class="details_one_">
                    <h2> Deposite</h2>
                    <p>{user.UserSubscription[0].deposite} </p>
                  </div>
                  <div class="details_one_">
                    <h2>Price</h2>
                    <p>{user.UserSubscription[0].price}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            )}

            <hr />
            <br />
            <div class="event_btn_admin">
              <h3>User Book Details</h3>
            </div>

            <table id="example" class="cell-border stripe">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Author Name</th>
                  <th>Is Activated</th>
                  <th>Edit </th>
                </tr>
              </thead>
              <tbody>
                {user.UserBook === undefined ? (
                  <div style={{ marginLeft: "123px" }}>
                    <Loaderring />
                  </div>
                ) : (
                  user.UserBook.map((userBook, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{userBook.Book.bookName}</td>
                        <td>
                          {userBook.Book.BookAuthor
                            ? userBook.Book.BookAuthor.name
                            : ""}
                        </td>
                        <td>
                          {userBook.Book.isActivated.toString()}
                          {/* {userBook.Book.isActivated ? (
                            <label class="switch">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  onStatusChange(userBook.Book.id, false)
                                }
                                checked
                              />
                              <span class="slider round"></span>
                            </label>
                          ) : (
                            <label class="switch">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  onStatusChange(userBook.Book.id, true)
                                }
                              />
                              <span class="slider round"></span>
                            </label>
                          )} */}
                        </td>
                        <td>
                          <button onClick={() => onBookEdit(userBook.Book.id)}>
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUserDetail;
