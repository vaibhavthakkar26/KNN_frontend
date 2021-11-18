import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CommanService from "../../services/comman.service";
import "./Admin.css";
function Adminsidebar(props) {
  useEffect(() => {
    const doFetch = async () => {
      const token = localStorage.getItem("accessToken");
      if (token === null || token === undefined) {
        props.history.push(`/`);
      } else {
        const decodetoken = await CommanService.decodeJWTToken(token);
        if (decodetoken.Role !== "Platform Admin") {
          props.history.push(`/`);
        }
      }
    };
    doFetch();
  }, []);
  return (
    // <div class="admin_side_main">
    <div class="admin_side_area">
      <div class="admin_logo_area"> LOGO</div>
      <hr style={{ border: "1px solid   black" }} />
      <div class="li_area_admin">
        <ul class="admin_list_ul_area">
          <Link to="/admindashboard">
            <li> Dashboard </li>
          </Link>
          <li> Users </li>
          <Link to="/adminbloglist">
            <li> Blog </li>
          </Link>
          <Link to="/adminevent">
            <li> Event </li>
          </Link>
          <li> Discussion Forum </li>
          <li> Category</li>
          <li> Subscription</li>
          <Link to="/adminbooklist">
            <li> Book</li>
          </Link>
          <li> order </li>
        </ul>
      </div>
    </div>
    // </div>
  );
}

export default Adminsidebar;
