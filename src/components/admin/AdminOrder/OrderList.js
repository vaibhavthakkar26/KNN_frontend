import React, { useEffect, useState } from "react";
import Adminsidebar from "../Adminsidebar";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Loaderring from "../../../comman/Loader";
import ErrorToast from "../../../comman/ErrorToast";
import SuccessToast from "../../../comman/SuccessToast";
import UserServices from "../../../services/user.services";

function OrderList(props) {
  const [pendingOrder, setPendingOrder] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);
  const [onthewaydOrder, setOnthewayOrder] = useState([]);
  const [cancledOrder, setCancleOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrder = async (status) => {
    setIsLoading(true);
    const order = await UserServices.getOrder(status);
    if (status === "PENDING") {
      setPendingOrder(order.data.data);
    } else if (status === "DELIVERED") {
      setDeliveredOrder(order.data.data);
    } else if (status === "ONTHEWAY") {
      setOnthewayOrder(order.data.data);
    } else if (status === "CANCLE") {
      setCancleOrder(order.data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const doFetch = async () => {
      await getOrder("PENDING");
      await getOrder("DELIVERED");
      await getOrder("ONTHEWAY");
      await getOrder("CANCLE");
      $(document).ready(function () {
        $("#example").DataTable();
      });
      $(document).ready(function () {
        $("#example2").DataTable();
      });
      $(document).ready(function () {
        $("#example3").DataTable();
      });
      $(document).ready(function () {
        $("#example4").DataTable();
      });
    };
    doFetch();
  }, []);

  const onOrderSelect = async (orderId) => {
    console.log("orderId: ", orderId);
    props.history.push(`/adminOrderDetails?id=${orderId}`);
  };
  return (
    <div class="admin_side_main">
      <Adminsidebar />
      <div className="MainDiv">
        <div class="event_btn_admin">
          <h3>New Orders</h3>
        </div>
        <table id="example" class="cell-border stripe">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>EmailId</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Delivered To</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              pendingOrder.map((data, i) => {
                return (
                  <tr>
                    <td onClick={() => onOrderSelect(data.id)}>{i + 1}</td>
                    <td>{data.User.firstName}</td>
                    <td>{data.User.emailId}</td>
                    <td>{data.status}</td>
                    <td>{data.totalAmount}</td>
                    <td>
                      Name: {data.firstName} {data.lastName}
                      <br />
                      EmailId: {data.emailId}
                      <br />
                      Mobile No.: {data.mobileNumber}
                      <br />
                      Address: {data.deliveryAddress}
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
          <h3>On The Way</h3>
        </div>
        <table id="example2" class="cell-border stripe">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>EmailId</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Delivered To</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              onthewaydOrder.map((data, i) => {
                return (
                  <tr>
                    <td onClick={() => onOrderSelect(data.id)}>{i + 1}</td>
                    <td>{data.User.firstName}</td>
                    <td>{data.User.emailId}</td>
                    <td>{data.status}</td>
                    <td>{data.totalAmount}</td>
                    <td>
                      Name: {data.firstName} {data.lastName}
                      <br />
                      EmailId: {data.emailId}
                      <br />
                      Mobile No.: {data.mobileNumber}
                      <br />
                      Address: {data.deliveryAddress}
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
          <h3>DELIVERED</h3>
        </div>
        <table id="example3" class="cell-border stripe">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>EmailId</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Delivered To</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              deliveredOrder.map((data, i) => {
                return (
                  <tr>
                    <td onClick={() => onOrderSelect(data.id)}>{i + 1}</td>
                    <td>{data.User.firstName}</td>
                    <td>{data.User.emailId}</td>
                    <td>{data.status}</td>
                    <td>{data.totalAmount}</td>
                    <td>
                      Name: {data.firstName} {data.lastName}
                      <br />
                      EmailId: {data.emailId}
                      <br />
                      Mobile No.: {data.mobileNumber}
                      <br />
                      Address: {data.deliveryAddress}
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
          <h3>CANCLE</h3>
        </div>
        <table id="example4" class="cell-border stripe">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>EmailId</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Delivered To</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              cancledOrder.map((data, i) => {
                return (
                  <tr>
                    <td onClick={() => onOrderSelect(data.id)}>{i + 1}</td>
                    <td>{data.User.firstName}</td>
                    <td>{data.User.emailId}</td>
                    <td>{data.status}</td>
                    <td>{data.totalAmount}</td>
                    <td>
                      Name: {data.firstName} {data.lastName}
                      <br />
                      EmailId: {data.emailId}
                      <br />
                      Mobile No.: {data.mobileNumber}
                      <br />
                      Address: {data.deliveryAddress}
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
      </div>
    </div>
  );
}

export default OrderList;
