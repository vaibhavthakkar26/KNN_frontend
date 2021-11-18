import React, { useEffect, useState } from "react";
import GD1 from "../assets/image/onlinegraphicdesignclassesknn 1.png";
import Dm1 from "../assets/image/onlinedigitalmarketingclassknn 1.png";
import "./specialevent.css";
import EventService from "../services/event.services";
import Loaderring from "./Loader";
function Specialevent(props) {
  const [events, setEvents] = useState([]);
  const [events1, setEvents1] = useState("");
  const [events2, setEvents2] = useState("");
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const getEnevnts = await EventService.getAllEvents(false);
      console.log("getEnevnts", getEnevnts);
      // setEvents(getEnevnts.data.data);
      if (getEnevnts.data.data.length >= 2) {
        for (let i = 0; i < 2; i++) {
          events.push(getEnevnts.data.data[i]);
        }
      } else {
        for (let i = 0; i < getEnevnts.data.data.length; i++) {
          events.push(getEnevnts.data.data[i]);
        }
      }
      // setEvents1(getEnevnts.data.data[0].titleImage);
      // setEvents2(getEnevnts.data.data[1].titleImage);
      setisLoading(false);
    };
    fetchData();
  }, []);

  async function onEventSelect(eventId) {
    props.history.push(`/eventin?id=${eventId}`);
  }
  return (
    <div>
      <div class="event_section">
        <div class="event_discuss_part">
          <div class="Speacial_event">
            <h2> SPECIAL EVENTS</h2>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
            <button class="rt_btn"> REGISTER TODAY</button>
          </div>

          {isLoading ? (
            <div style={{ marginLeft: "123px" }}>
              <Loaderring />
            </div>
          ) : (
            events.map((eventsData) => (
              <img
                src={eventsData.titleImage}
                class="online_dm"
                alt=""
                onClick={() => onEventSelect(eventsData.id)}
              />
            ))
          )}

          {/* <img src={events2} class="online_dm" alt="" /> */}

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Specialevent;
