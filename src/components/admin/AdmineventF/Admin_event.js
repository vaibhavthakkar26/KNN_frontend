import axios from "axios";
import React, { useMemo, useEffect, useState } from "react";
import EventService from "../../../services/event.services";

// import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Loaderring from "../../../comman/Loader";
import Adminsidebar from "../Adminsidebar";
import { Link } from "react-router-dom";
import ErrorToast from "../../../comman/ErrorToast";
import SuccessToast from "../../../comman/SuccessToast";
import { ToastContainer, toast } from "react-toastify";

function Adminevent(props) {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getAllEvents = async () => {
    setisLoading(true);
    const getEnevnts = await EventService.getAllEvents(true);
    console.log("getEnevnts", getEnevnts.data.data);
    for (let i = 0; i < getEnevnts.data.data.length; i++) {
      getEnevnts.data.data[i].startAt = new Date(
        getEnevnts.data.data[i].startAt
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      getEnevnts.data.data[i].endAt = new Date(
        getEnevnts.data.data[i].endAt
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
    await setData(getEnevnts.data.data);
    console.log(data);
    setisLoading(false);
  };

  useEffect(() => {
    const doFetch = async () => {
      await getAllEvents();
      $(document).ready(function () {
        $("#example").DataTable();
      });
    };
    doFetch();
  }, []);

  const onDelete = async (deleteId) => {
    setisLoading(true);
    console.log("delete id", deleteId);
    const deleteEvent = await EventService.deleteEvent(deleteId);
    if (deleteEvent.status === 200) {
      SuccessToast(deleteEvent.data.message);
    } else {
      ErrorToast(deleteEvent.data.message);
    }
    await getAllEvents();
  };

  const onStatusChange = async (id, changeTo) => {
    setisLoading(true);
    console.log("onStatusChange", id, changeTo);
    const statusChange = await EventService.eventStatusChange(id, changeTo);
    if (statusChange.status === 200) {
      SuccessToast(statusChange.data.message);
    } else {
      ErrorToast(statusChange.data.message);
    }

    await getAllEvents();
  };

  const onEventClick = async (eventId) => {
    console.log("BlogId: ", eventId);
    props.history.push(`/admineventdetails?id=${eventId}`);
  };

  const onEventEdit = async (eventId) => {
    console.log("BlogId: ", eventId);
    props.history.push(`/admineventcreate?id=${eventId}`);
  };

  return (
    <div className="admin_side_main">
      <Adminsidebar />
      <div className="MainDiv">
        {/* <div className="container"> */}
        <div class="event_btn_admin">
          <h3>Events</h3>
          <Link to="/admineventcreate">
            <button> Create Event </button>
          </Link>
        </div>
        <table id="example" class="cell-border stripe">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Start At</th>
              <th> End At </th>
              <th>Status</th>
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
              data.map((res, i) => {
                return (
                  <tr class="table-success">
                    <td>{i + 1}</td>
                    <td onClick={() => onEventClick(res.id)}>{res.title}</td>
                    <td>{res.startAt}</td>
                    <td>{res.endAt}</td>
                    <td>
                      {res.isActive ? (
                        <label class="switch">
                          <input
                            type="checkbox"
                            onChange={() => onStatusChange(res.id, false)}
                            checked
                          />
                          <span class="slider round"></span>
                        </label>
                      ) : (
                        <label class="switch">
                          <input
                            type="checkbox"
                            onChange={() => onStatusChange(res.id, true)}
                          />
                          <span class="slider round"></span>
                        </label>
                      )}
                    </td>
                    <td>
                      <button onClick={() => onEventEdit(res.id)}>Edit</button>
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
        {/* </div> */}
      </div>
    </div>
  );
}

export default Adminevent;
