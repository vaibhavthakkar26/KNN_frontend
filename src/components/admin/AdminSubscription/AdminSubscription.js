import React, { useEffect, useState } from "react";
import Adminsidebar from "../Adminsidebar";
import "jquery/dist/jquery.min.js";
import deletesvg from "../../../assets/image/delete.svg";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import MembershipPlanService from "../../../services/membershipPlan.services";
import CommanService from "../../../services/comman.service";
import Loaderring from "../../../comman/Loader";
function AdminSubscription(props) {
  const [allSubscription, setAllSubscription] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAll = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token === null || token === undefined) {
      props.history.push(`/`);
    } else {
      const decodetoken = await CommanService.decodeJWTToken(token);
      if (decodetoken.Role !== "Platform Admin") {
        props.history.push(`/`);
      } else {
        const sub = await MembershipPlanService.getMembershipPlan(token);
        setAllSubscription(sub.data.data);
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    const doFetch = async () => {
      await getAll();
      $(document).ready(function () {
        $("#example").DataTable();
      });
    };
    doFetch();
  }, []);
  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <table
            id="example"
            class="cell-border stripe"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>type</th>
                <th>No. of Books</th>
                <th>Deposite</th>
                <th>price</th>
                {/* <th><img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/4a90e2/external-edit-interface-kiranshastry-lineal-color-kiranshastry.png" alt="" width="30" height="30"/></th> */}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div style={{ marginLeft: "123px" }}>
                  <Loaderring />
                </div>
              ) : (
                allSubscription.map((subscription, i) => {
                  return (
                    <tr class="table-success">
                      <td> {i + 1} </td>
                      <td> {subscription.title} </td>
                      <td> {subscription.description} </td>
                      <td>{subscription.type}</td>
                      <td>{subscription.noOfBook}</td>
                      <td>{subscription.deposite}</td>
                      <td>{subscription.price}</td>
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

export default AdminSubscription;
