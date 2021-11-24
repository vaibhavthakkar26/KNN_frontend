import React, { useState, useEffect } from "react";
import UserServices from "../../../services/user.services";
import Adminsidebar from "../Adminsidebar";
import queryString from "query-string";
import Loaderring from "../../../comman/Loader";
import SuccessToast from "../../../comman/SuccessToast";
import ErrorToast from "../../../comman/ErrorToast";

function OrderDetails(props) {
  const { id } = queryString.parse(props.location.search);
  const [order, setOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();

  const getOrder = async () => {
    setIsLoading(true);
    const getorder = await UserServices.getOrderById(id);
    setOrder(getorder.data.data);
    setStatus(order.status);
    setIsLoading(false);
  };

  useEffect(() => {
    const doFetch = async () => {
      await getOrder();
    };
    doFetch();
  }, []);

  const onStatusChange = async () => {
    setIsLoading(true);
    const OrderStatusChange = await UserServices.orderStatusChange(id, status);
    if (OrderStatusChange.status === 200) {
      SuccessToast(OrderStatusChange.data.message);
      props.history.push(`/adminOrderList`);
    } else {
      ErrorToast(OrderStatusChange.data.message);
    }
    setIsLoading(false);
  };
  return (
    <div class="admin_side_main">
      <Adminsidebar />
      <div className="MainDiv">
        <div class="event_btn_admin">
          <h3>Order</h3>
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
                  src={order.User ? order.User.profilePicture : ""}
                  alt=""
                  width="200"
                  height="200"
                  style={{ marginTop: "50px" }}
                />
              </div>
              <div class="main_details_area_admin">
                <div class="details_one_">
                  <h2>Status</h2>
                  <p> {order.status}</p>
                </div>
                <div class="details_one_">
                  <h2> Amount</h2>
                  <p> {order.totalAmount} </p>
                </div>
                <div class="details_one_">
                  <h2>Name </h2>
                  <p> {order.User ? order.User.firstName : ""}</p>
                </div>
                <div class="details_one_">
                  <h2> EmailId</h2>
                  <p>{order.User ? order.User.emailId : ""} </p>
                </div>
                <div class="details_one_">
                  <h2> Mobile No.</h2>
                  <p>{order.User ? order.User.mobileNumber : ""} </p>
                </div>
                <div class="details_one_">
                  <h2>Address</h2>
                  <p>{order.User ? order.User.address : ""} </p>
                </div>
                <div class="details_one_">
                  <h2> Delivered To</h2>
                  <p>
                    Name: {order.firstName} {order.lastName}
                    <br />
                    EmailId: {order.emailId}
                    <br />
                    Mobile No.: {order.mobileNumber}
                    <br />
                    Address: {order.deliveryAddress}
                  </p>
                </div>
                <div class="details_one_">
                  <h2>Status Change</h2>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="ONTHEWAY">ONTHEWAY</option>
                    <option value="CANCLE">CANCLE</option>
                  </select>
                  <button onClick={() => onStatusChange()}>Change</button>
                </div>
              </div>
            </div>
            <hr />

            <div class="event_btn_admin">
              <h3>Order Details</h3>
            </div>

            {order.OrderDetail && order.OrderDetail.length > 0 ? (
              order.OrderDetail.map((det) => {
                return (
                  <div>
                    <div class="Image_area_event_admin">
                      <img
                        src={det.Book.titleImage}
                        alt=""
                        width="200"
                        height="200"
                        style={{ marginTop: "50px" }}
                      />
                    </div>
                    <div class="main_details_area_admin">
                      <div class="details_one_">
                        <h2>Book Name</h2>
                        <p> {det.Book.bookName}</p>
                      </div>
                      <div class="details_one_">
                        <h2> Author Name</h2>
                        <p> {det.Book.BookAuthor.name} </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            )}
            <hr />
            <div class="event_btn_admin">
              <h3>Get Back From User</h3>
            </div>

            {order.GetBackFromUser && order.GetBackFromUser.length > 0 ? (
              order.GetBackFromUser.map((getBack) => {
                return (
                  <div>
                    <div class="Image_area_event_admin">
                      <img
                        src={getBack.titleImage}
                        alt=""
                        width="200"
                        height="200"
                        style={{ marginTop: "50px" }}
                      />
                    </div>
                    <div class="main_details_area_admin">
                      <div class="details_one_">
                        <h2>Book Name</h2>
                        <p> {getBack.bookName}</p>
                      </div>
                      <div class="details_one_">
                        <h2> Author Name</h2>
                        <p> {getBack.BookAuthor.name} </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
