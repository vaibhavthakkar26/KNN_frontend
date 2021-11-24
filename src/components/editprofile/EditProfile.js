import React, { useEffect, useState } from "react";
import "../editprofile/EditProfile.css";
import Header from "../../components/navbar/navbar";
// import image1 from "../../assets/image/";
import Ellipse87 from "../../assets/image/Ellipse87.svg";
import pencil from "../../assets/image/pencil1.svg";
import dummyurl from "../../assets/image/dummyuser.jpg";
import CommanService from "../../services/comman.service";
import ErrorToast from "../../comman/ErrorToast";
import UserServices from "../../services/user.services";
import SuccessToast from "../../comman/SuccessToast";
import Loaderring from "../../comman/Loader";
function EditProfile(props) {
  const [user, setUser] = useState();
  const [userImage, setuserImage] = useState(dummyurl);
  const [firstName, setFirstName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
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

        setFirstName(userdata.data.data.firstName);
        setMobileNo(userdata.data.data.mobileNumber);
        setAddress(userdata.data.data.address);
        setuserImage(userdata.data.data.profilePicture);

        setisLoading(false);
      }
    };
    fetchData();
  }, []);

  function ImageUpload(event) {
    setuserImage(URL.createObjectURL(event.target.files[0]));
  }


  async function updateUser() {
    console.log(userImage, "userImage");
    setisLoading(true);
    const decodetoken = await CommanService.decodeJWTToken(token);
    const userdata = await UserServices.updateUser(
      decodetoken.id,
      firstName,
      mobileNo,
      address,
      userImage
    );
    if (userdata.status === 200) {
      setisLoading(false);
      SuccessToast("Profile update successfully.");
    } else {
      ErrorToast(userdata.data.message);
    }
    const userId = decodetoken.id;
    setisLoading(true);
    const userdataa = await UserServices.getUserWithCount(userId);
    setUser(userdata.data.data);

    setFirstName(userdataa.data.data.firstName);
    setMobileNo(userdataa.data.data.mobileNumber);
    setAddress(userdataa.data.data.address);
    setuserImage(userdataa.data.data.profilePicture);

    setisLoading(false);
  }
  return (
    <div>
      <Header />
      <div class="edit_profile_body">
        <svg
          width="111"
          height="111"
          viewBox="0 0 111 111"
          className="circle_ep"
          fill="none"
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
          width="75"
          height="84"
          viewBox="0 0 75 84"
          fill="none"
          className="triangle_ep"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.391814 83.7169L7.66169 0.883308L74.4468 45.9L0.391814 83.7169Z"
            fill="#0055B3"
            fill-opacity="0.28"
          />
        </svg>

        <svg
          width="97"
          height="88"
          viewBox="0 0 97 88"
          fill="none"
          className="triangle_right_ep"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M96.454 0.15406L54.8743 87.6983L0.171186 11.2212L96.454 0.15406Z"
            fill="#0055B3"
            fill-opacity="0.28"
          />
        </svg>

        <div className="edit_profile_main">
          <div className="edit_profile_one">
            <h3 style={{ color: "#0055B3" }}>Edit profile</h3>
            <hr style={{ border: "1px solid rgba(255, 193, 6, 1)" }} />
          </div>
          <div className="edit_part_user">
            <div className="profile_picture_edit_profile">
              <img src={userImage} alt="" />
            </div>
            <input type="file" onChange={ImageUpload} />
            <div className="edit_pencil_area">
              <img
                src={Ellipse87}
                className="pen_edit"
                width="84px"
                height="84px"
                alt=""
              />
              <img
                src={pencil}
                className="pencil_edit"
                width="38px"
                height="38px"
                alt=""
              />
            </div>
            <div className="user_input_area_ep">
              <input type="text" placeholder="full name" className="edit_input" value={firstName}
                onChange={(e) => setFirstName(e.target.value)}/>
              <br />
              {/* <input type="email" placeholder="Email" className="edit_input" /> */}
              <br />
              <input
                type="number"
                placeholder="contact No"
                className="edit_input"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
              <br />
              <input type="text" placeholder="Address" className="edit_input"   value={address}
                onChange={(e) => setAddress(e.target.value)} />
              <br />
              {/* <input
                type="password"
                placeholder="Password"
                className="edit_input"
              /> */}
            </div>
            <div>
            {isLoading ? (
                <div style={{ marginLeft: "123px" }}>
                  <Loaderring />
                </div>
              ) : (
                <button className="save_edit_profile" onClick={() => updateUser()}>
                  {" "}
                  save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
