import React, { useEffect, useState } from "react";
import "./Eventin.css";
import Rectangle197 from "../../assets/image/Rectangle 197.png";
import Rectangle198 from "../../assets/image/Rectangle 198.png";
import Rectangle199 from "../../assets/image/Rectangle 199.png";
import Loaderring from "../../comman/Loader";
import Header from "../../components/navbar/navbar";
import EventService from "../../services/event.services";
import Footer from "../../components/footer/Footer";
import queryString from "query-string";
import SuccessToast from "../../comman/SuccessToast";
import ErrorToast from "../../comman/ErrorToast";
import { toast } from "react-toastify";
import CommanService from "../../services/comman.service";
toast.configure();
function Eventin(props) {
  const [event, setEvent] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [eventDate, setEventDate] = useState();
  const [eventEndDate, setEventEndDate] = useState();
  const [registrationEndsAt, setRegistrationEndsAt] = useState();
  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const getEnevnt = await EventService.getEvent(id);
      console.log("getEnevnt  ", getEnevnt);
      setEvent(getEnevnt.data.data);
      setEventDate(
        new Date(getEnevnt.data.data.startAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setEventEndDate(
        new Date(getEnevnt.data.data.endAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setRegistrationEndsAt(
        new Date(getEnevnt.data.data.registrationEndAt).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        )
      );
      setisLoading(false);
    };
    fetchData();
  }, []);

  async function onEventRegistration() {
    const token = localStorage.getItem("accessToken");
    if (token === null || token === undefined) {
      props.history.push(`/login`);
      ErrorToast("please do login.");
    } else {
      const decodetoken = await CommanService.decodeJWTToken(token);
      const eventReg = await EventService.eventRegistration(id, decodetoken.id);

      if (eventReg.status === 200) {
        SuccessToast(eventReg.data.message);
        props.history.push(`/event`);
      } else {
        console.log("Event message: ", eventReg.data.message);
        ErrorToast(eventReg.data.message);
      }
    }
  }
  return (
    <div>
      <Header />
      {isLoading ? (
        <div style={{ marginLeft: "123px" }}>
          <Loaderring />
        </div>
      ) : (
        <div>
          {event ? (
            <div class="eve_in_main">
              <div class="eve_in_image">
                <img src="./images/image 1.png" alt="" />
              </div>
              <div class="regiseter_event_inside">
                <h3> {event.title} </h3>
                <button
                  class="registerbtn_in_eve"
                  onClick={() => onEventRegistration()}
                >
                  {" "}
                  REGISTER NOW
                </button>
              </div>
              <div class="event_inside_dis_main">
                <div class="one_event_discussion">
                  <p> {event.body}</p>
                </div>
                {/* <div class="event_side_video"> */}
                <iframe
                  class="event_side_video"
                  frameborder="0"
                  allowfullscreen
                  src={event.videoLink}
                ></iframe>
                {/* </div> */}
              </div>
              <div class="event_course_plan">
                <div class="event_in_dT">
                  <h3> Start DATE & TIME</h3>
                  <p> {eventDate} </p>
                  {/* <p> may 13,2021 </p> */}
                </div>
                <div class="event_in_duration">
                  <h3> End DATE & TIME</h3>
                  <p> {eventEndDate} </p>
                </div>
                <div class="event_in_shift">
                  <h3> SHIFTS </h3>
                  <p> {event.shifts} </p>
                </div>
              </div>
              <div class="event_benfits">
                <h2> BENEFITS </h2>
                <div class="event_in_play">
                  <svg
                    width="134"
                    height="120"
                    viewBox="0 0 134 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M133.987 12.5191L53.3118 119.258L0.723903 0.57897L133.987 12.5191Z"
                      fill="#0055B3"
                      fill-opacity="0.28"
                    />
                  </svg>
                </div>
              </div>
              <div class="benfits_point_event_inside">
                {/* <div class="point_benfints_one">
                      <div class="point_benfits_two">
                        <h2> 1.LIMITED STUDENT IN A GROUP </h2>
                      </div>
                    </div> */}
                {event.EventBenefits ? (
                  event.EventBenefits.map((eventBebefits, i) => (
                    <div class="point_benfits_two">
                      <h2>
                        {" "}
                        {i + 1}. {eventBebefits.benefits}{" "}
                      </h2>
                    </div>
                  ))
                ) : (
                  <div style={{ marginLeft: "123px" }}>
                    <Loaderring />
                  </div>
                )}
                {/* 
                    <div class="point_benfits_two">
                      <h2> 3. GUIDANCE AND FEEDBACK THE INSTRUCTOR </h2>
                    </div>
                    <div class="point_benfits_three">
                      <h2> 4.YOU MIGHT GET AN INTERNSHIP OR A JOB OPPORTUNITY </h2>
                    </div> */}
              </div>
              <div class="event_inside_eligilty">
                <h3> ELIGIBILTY</h3>
              </div>
              <div class="eligibilty_event_">
                <h1> {event.eligibility} </h1>
              </div>

              <div class="meet_speakers">
                <h2>
                  {" "}
                  MEET <br /> THE SPEAKERS{" "}
                </h2>
              </div>

              <div class="company_profile_">
                {event.EventSpeakers ? (
                  event.EventSpeakers.map((eventSpeaker, i) => (
                    <div class="cp_two">
                      <img
                        src={eventSpeaker.profilePicture}
                        width="393"
                        height="435"
                        alt="knn event speaker"
                      />
                      <h3> {eventSpeaker.name}</h3>
                      <p>{eventSpeaker.designation}</p>
                      <p>{eventSpeaker.company} </p>
                    </div>
                  ))
                ) : (
                  <div style={{ marginLeft: "123px" }}>
                    <Loaderring />
                  </div>
                )}
              </div>

              <div class="event_inside_requirment">
                <h3> REQUIREMENTS </h3>
              </div>

              <div class="requirements_tools">
                {event.EventRequirements ? (
                  event.EventRequirements.map((eventRequirement, i) => (
                    <div class="requirements_child_one">
                      <h3>
                        {" "}
                        {i + 1}.{eventRequirement.requirements}
                      </h3>
                    </div>
                  ))
                ) : (
                  <div style={{ marginLeft: "123px" }}>
                    <Loaderring />
                  </div>
                )}
              </div>

              <div class="learning_part">
                <h3> YOU WILL BE LEARNING </h3>
              </div>

              <div class="courses_part_">
                {event.EventLearning ? (
                  event.EventLearning.map((eventLearning, i) => (
                    <div class="course_child_one">
                      <h3>
                        {i + 1}.{eventLearning.learning}
                      </h3>
                    </div>
                  ))
                ) : (
                  <div style={{ marginLeft: "123px" }}>
                    <Loaderring />
                  </div>
                )}
              </div>

              <div class="entrey_fee_area">
                <h3> ENTRY FEE</h3>
              </div>
              <h3 class="fee_amount">
                {event.isFree
                  ? "This  is free of coast "
                  : `To apply, the applicants should pay the fee of Rs. ${event.fee}`}{" "}
              </h3>
              <div class="entrey_fee_disscusion">
                <p class="notes">
                  {" "}
                  Note: first five to apply will get Rs 500 discount.
                </p>
              </div>

              <div class="venuse_part">
                <h3 class="venue_head"> VENUE</h3>
                <p class="venue_platform">
                  Classes wiil be run in the{" "}
                  <span class="venue_platform_span"> {event.venue} </span>{" "}
                </p>
              </div>

              <div class="deadline_part">
                <h3 class="dd_head"> APPLICATION DEADLINE</h3>
                <h3 class="deadline_time_area"> {registrationEndsAt}</h3>
              </div>

              <div class="info_event_inside">
                <p>
                  For more details, contact us on{" "}
                  <span class="event_p_span"> 9861446103 | 9851276313 </span>{" "}
                  <br />
                  or send us an email to{" "}
                  <span class="event_p_span"> info@knnepal.comv </span>{" "}
                </p>
                <button
                  class="event_inside_registerbtn"
                  onClick={() => onEventRegistration()}
                >
                  {" "}
                  REGISTER NOW{" "}
                </button>
              </div>

              <div></div>
            </div>
          ) : (
            <div style={{ marginLeft: "123px" }}>
              <Loaderring />
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Eventin;
