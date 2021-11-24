import React, { useEffect, useState } from "react";
import eventoneimg from "../../assets/image/Rectangle 84.png";
import eventsecondImg from "../../assets/image/Rectangle 85.png";
import "./event.css";
import searchIcon from "../../assets/image/search 1.svg";
import Loaderring from "../../comman/Loader";
import EventService from "../../services/event.services";
import Header from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
function Event(props) {
  const [events, setEvents] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const getEnevnts = await EventService.getAllEvents(false);
      console.log("getEnevnts", getEnevnts);
      setEvents(getEnevnts.data.data);
      setisLoading(false);
    };
    fetchData();
  }, []);

  const onEventClick = async (blogId) => {
    console.log("BlogId: ", blogId);
    props.history.push(`/eventin?id=${blogId}`);
  };
  return (
    <div>
      <Header />
      <div className="event_1_svg_round">
        <svg
          width="399"
          height="629"
          viewBox="0 0 399 629"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            r="302"
            transform="matrix(-1 0 0 1 84.5 314.5)"
            stroke="#FFC106"
            stroke-opacity="0.25"
            stroke-width="25"
          />
        </svg>
      </div>

      <div className="event_first_section">
        <h3 className="all_events_area"> All Events </h3>
        <h3 className="new_events_area"> new Events </h3>

        <div className="event_search">
          <input type="search" placeholder="Type to search" />
          <div className="event_svg_round">
            <img src={searchIcon} alt="" width="22px" height="22px" />
          </div>
        </div>

        <button className="your_event_btn">your event</button>
      </div>

      {isLoading ? (
        <div style={{ marginLeft: "123px" }}>
          <Loaderring />
        </div>
      ) : (
        events.map((event, i) => {
          if (i % 2 === 0) {
            return (
              <div className="event_main_section">
                <div className="events_area">
                  <img
                    src={event.titleImage}
                    alt=""
                    className="images_event_page"
                    onClick={() => onEventClick(event.id)}
                  />

                  <div className="event_discussion_area">
                    <h2> {event.title}</h2>
                    <h3> {event.subTitle}</h3>
                    <p> {event.body} </p>

                    <button className="event_mainreigster_btn">
                      Register Here !
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="event_area_2">
                <div className="event2_part_one">
                  <div className="event2_discuusion_area">
                    <h2> {event.title} </h2>
                    <h3> {event.subTitle}</h3>
                    <p> {event.body}</p>
                    <button className="event_button_2_register event_mainreigster_btn">
                      {" "}
                      Register here !{" "}
                    </button>
                  </div>
                </div>
                <div className="event2_part_two">
                  <img
                    src={event.titleImage}
                    alt=""
                    className="images_event_page"
                    onClick={() => onEventClick(event.id)}
                  />
                </div>

                <div className="svg_play">
                  <svg
                    width="85"
                    height="95"
                    viewBox="0 0 85 95"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M85 47.2868L0.250003 94.3006L0.250007 0.273052L85 47.2868Z"
                      fill="#0055B3"
                      fill-opacity="0.28"
                    />
                  </svg>
                </div>
              </div>
            );
          }
        })
      )}
      <Footer />
    </div>
  );
}

export default Event;
