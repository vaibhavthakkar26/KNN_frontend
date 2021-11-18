import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Adminsidebar from "../Adminsidebar";
import CommanService from "../../../services/comman.service";
import EventService from "../../../services/event.services";
import ErrorToast from "../../../comman/ErrorToast";
import SuccessToast from "../../../comman/SuccessToast";
import queryString from "query-string";
function Admin_CreateEvent(props) {
  const { id } = queryString.parse(props.location.search);
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [description, setdescription] = useState("");
  const [titleimage, settitleimage] = useState("");
  const [startat, setstartat] = useState("");
  const [endat, setendat] = useState("");
  const [eligibility, seteligibility] = useState("");
  const [fee, setfee] = useState("");
  const [registrationendat, setregistrationendat] = useState("");
  const [shifts, setshifts] = useState("");
  const [vanue, setvanue] = useState("");
  const [videolink, setvideolink] = useState("");

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      console.log("id", id);
      if (id !== undefined && id !== null) {
        console.log("in if");
        setisLoading(true);
        const getEnevnt = await EventService.getEvent(id);
        console.log("getEnevnt  ", getEnevnt);
        settitle(getEnevnt.data.data.title);
        setsubtitle(getEnevnt.data.data.subTitle);

        setdescription(getEnevnt.data.data.body);
        // settitleimage(getEnevnt.data.data.titleImage);
        setstartat(new Date(getEnevnt.data.data.startAt));
        setendat(new Date(getEnevnt.data.data.endAt));
        seteligibility(getEnevnt.data.data.eligibility);
        setfee(getEnevnt.data.data.fee);
        setregistrationendat(new Date(getEnevnt.data.data.registrationEndAt));
        setshifts(getEnevnt.data.data.shifts);
        setvanue(getEnevnt.data.data.venue);
        setvideolink(getEnevnt.data.data.videoLink);
        setisLoading(false);
      }
    };
    doFetch();
  }, []);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  const createHandele = async () => {
    const token = localStorage.getItem("accessToken");
    if (token === null || token === undefined) {
      props.history.push(`/`);
    } else {
      const decodetoken = await CommanService.decodeJWTToken(token);
      if (decodetoken.Role !== "Platform Admin") {
        props.history.push(`/`);
      } else {
        console.log("title", title);
        console.log("subTitle", subtitle);
        console.log("description", description);
        console.log("startat", startat);
        console.log("endat", endat);
        console.log("createdBy", decodetoken.id);
        console.log("titleimage", titleimage[0]);
        console.log("eligibility", eligibility);
        console.log("shifts", shifts);
        console.log("fee", fee);
        console.log("vanue", vanue);
        console.log("registrationendat", registrationendat);
        console.log("videolink", videolink);

        if (id !== undefined && id !== null) {
          // edit
          const updateEvent = await EventService.updateEvent(
            id,
            title,
            subtitle,
            description,
            startat,
            endat,
            decodetoken.id,
            titleimage[0],
            eligibility,
            shifts,
            fee,
            vanue,
            registrationendat,
            videolink
          );
          if (updateEvent.status === 200) {
            SuccessToast(updateEvent.data.message);
            props.history.push(`/admineventdetails?id=${id}`);
          } else {
            ErrorToast(updateEvent.data.message);
          }
        } else {
          // create
          const createEvent = await EventService.createEvent(
            title,
            subtitle,
            description,
            startat,
            endat,
            decodetoken.id,
            titleimage[0],
            eligibility,
            shifts,
            fee,
            vanue,
            registrationendat,
            videolink
          );
          if (createEvent.status === 200) {
            SuccessToast(createEvent.data.message);
            props.history.push(
              `/admineventdetails?id=${createEvent.data.data.id}`
            );
          } else {
            ErrorToast(createEvent.data.message);
          }
        }
      }
    }
  };
  return (
    <div className="admin_side_main">
      <Adminsidebar />
      <div className="MainDiv">
        <div>
          <div class="main_div_create_event">
            <div class="title">
              <label>Title </label>
              <input
                type="text"
                placeholder="Title"
                class="input_signup"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
            <div class="sub_title">
              <label>sub Title </label>
              <input
                type="text"
                placeholder="Sub Title"
                class="input_signup"
                value={subtitle}
                onChange={(e) => setsubtitle(e.target.value)}
              />
            </div>
            <div class="description">
              <label>Description </label>
              <input
                type="textarea"
                placeholder="Description"
                class="input_signup"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <div class="title_image">
              <label>Title Image </label>
              <input
                type="file"
                placeholder="Title Image"
                class="input_signup"
                onChange={(e) => settitleimage(e.target.files)}
              />
            </div>
            <div class="start_at">
              <label>Start At </label>
              <DatePicker
                selected={startat}
                onChange={(date) => setstartat(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div class="end_at">
              <label>End At </label>
              <DatePicker
                value={endat}
                selected={endat}
                onChange={(date) => setendat(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div class="eligibility">
              <label>Eligibility </label>
              <input
                type="text"
                placeholder="Eligibility"
                class="input_signup"
                value={eligibility}
                onChange={(e) => seteligibility(e.target.value)}
              />
            </div>
            <div class="fee">
              <label>Fee </label>
              <input
                type="number"
                placeholder="Fee"
                class="input_signup"
                value={fee}
                onChange={(e) => setfee(e.target.value)}
              />
            </div>
            <div class="registration_end_at">
              <label>Registration End At </label>
              <DatePicker
                value={registrationendat}
                selected={registrationendat}
                onChange={(date) => setregistrationendat(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div class="shifts">
              <label>Shifts </label>
              <input
                type="text"
                placeholder="Shifts"
                class="input_signup"
                value={shifts}
                onChange={(e) => setshifts(e.target.value)}
              />
            </div>
            <div class="venue">
              <label>Venue </label>
              <input
                type="text"
                placeholder="Venue"
                class="input_signup"
                value={vanue}
                onChange={(e) => setvanue(e.target.value)}
              />
            </div>
            <div class="video_link">
              <label>Video Link </label>
              <input
                type="text"
                placeholder="Video Link"
                class="input_signup"
                value={videolink}
                onChange={(e) => setvideolink(e.target.value)}
              />
            </div>
            <div class="btn_create_event">
              <button onClick={createHandele} class="signup_signup">
                {id !== undefined && id !== null
                  ? "Update Event"
                  : "Create Event"}
              </button>
            </div>
            {/* <div class="btn_add_benefits">
              <button class="signup_signup">Add Benefits</button>
            </div>
            <div class="btn_add_learning">
              <button class="signup_signup">Add Learning</button>
            </div>
            <div class="btn_add_speakers">
              <button class="signup_signup">Add Speakers</button>
            </div>
            <div class="btn_add_requirements">
              <button class="signup_signup">Add Requirements</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_CreateEvent;
