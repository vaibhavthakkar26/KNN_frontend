import React, { useEffect, useState } from "react";
import "../myprofile/Myprofile.css";
import Header from "../../components/navbar/navbar";
import UserServices from "../../services/user.services";
import CommanService from "../../services/comman.service";
import ErrorToast from "../../comman/ErrorToast";
import Loaderring from "../../comman/Loader";
import { Link } from "react-router-dom";
function Myprofile(props) {
  const [user, setUser] = useState();
  const [isLoading, setisLoading] = useState(false);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchData = async () => {
      
      if (token === null || token === undefined) {
        ErrorToast("Please do login");
        props.history.push(`/login`);
      } else {
        const decodetoken = await CommanService.decodeJWTToken(token);
        const userId = decodetoken.id;
        setisLoading(true);
        const userdata = await UserServices.getUserWithCount(userId);
        setUser(userdata.data.data);
        setisLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Header />
      {isLoading ? (
        <div style={{ marginLeft: "123px" }}>
          <Loaderring />
        </div>
      ) : (
        <div>
          {user ? (
            <div className="main_my_profile">
              <div className="mp_start">
                <div className="my_profile_mp">
                  <h1> My profile </h1>
                  <hr style={{ border: " 1px solid rgba(255, 193, 6, 1);" }} />
                </div>
                <svg
                  width="111"
                  height="111"
                  viewBox="0 0 111 111"
                  fill="none"
                  className="circle_mp"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="55.5"
                    cy="55.5"
                    r="55.5"
                    fill="#FFC106"
                    fill-opacity="0.28"
                  />
                </svg>
                <svg
                  width="124"
                  height="127"
                  viewBox="0 0 124 127"
                  fill="none"
                  className="triangle_seco"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M96.454 39.1541L54.8743 126.698L0.171186 50.2212L96.454 39.1541Z"
                    fill="#0055B3"
                    fill-opacity="0.28"
                  />
                </svg>
                <svg
                  width="73"
                  height="81"
                  viewBox="0 0 73 81"
                  fill="none"
                  className="triangle_mp_third"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M73 40.5L0.250004 80.7702L0.250007 0.229817L73 40.5Z"
                    fill="#0055B3"
                    fill-opacity="0.28"
                  />
                </svg>
                <div className="profile_area_mp">
                  <img src={user.profilePicture} alt="" />
                  <h3> Name: {user.firstName}</h3>
                  <h3> Email: {user.emailId}</h3>
                  <h3> contact Details:{user.mobileNumber}</h3>
                  <h3> Address: {user.address}</h3>
                  <Link to="/editprofile">
                  <button className="editprofile_btn">EDIT PROFILE</button>
                  </Link>
                </div>
                <h3 className="activites_myprofile"> Activites </h3>

                <div className="activity_books_mp">
                  <div className="box_one_my_profile">
                    <div className="boxes_activities_one">
                      <h2> No. of BooksExchanged </h2>
                      <h2> {user.bookExchanged}</h2>
                    </div>

                    <div className="boxes_activities_two ">
                      <h2> No. of Participated Events </h2>
                      <h2> {user.eventParticipated}</h2>
                    </div>
                    <div className="boxes_activities_three">
                      <h2> No. of Discussions </h2>
                      <h2> {user.discussions}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ marginLeft: "123px" }}>
              <Loaderring />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Myprofile;
