import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserServices from "../../services/user.services";
import RegisterImage from "../../assets/image/register.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ErrorToast from "../../comman/ErrorToast";
import "./Register.css";
import Loaderring from "../../comman/Loader";
toast.configure();
function Register(props) {
  const [fullname, setfullname] = useState("");
  const [nameerror, setnameerror] = useState("");
  const [username, setusername] = useState("");
  const [usernameerror, setusernameerror] = useState("");
  const [email, setemail] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [mobilenumber, setmobilenumber] = useState("");
  const [mobilenumbererror, setmobilenumbererror] = useState("");
  const [address, setaddress] = useState("");
  const [password, setpassword] = useState("");
  const [pwderror, setpwderror] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [confirmpwderror, setconfirmpwderror] = useState("");
  const [isLoading, setisLoading] = useState(false);
  // const [isFormValid,setisFormValid]=useState();

  let isFormValid = true;

  function validation() {
    // alert("in validation")
    if (fullname.length > 250) {
      setnameerror("full name is too long");
      isFormValid = false;
    } else if (fullname.trim().length === 0) {
      setnameerror("full name is not empty");
      isFormValid = false;
    } else {
      setnameerror("");
    }
    if (username.trim().length === 0) {
      setusernameerror("user name is empty");
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      setemailerror(" your Email Id is not valid");
      isFormValid = false;
    } else {
      setemailerror("");
    }

    if (mobilenumber.length !== 10) {
      setmobilenumbererror("incorrect mobile number");
      isFormValid = false;
    } else {
      setmobilenumbererror("");
    }

    const validPassword = new RegExp(".{8,}");
    if (!validPassword.test(password)) {
      setpwderror("your password is not valid");
      isFormValid = false;
    } else {
      setpwderror("");
    }

    if (Confirmpassword !== password) {
      setconfirmpwderror("password is not match");
      isFormValid = false;
    }

    return isFormValid;
  }
  const LoginHandler = async () => {
    if (validation()) {
      setisLoading(true);
      const userNameInUse = await UserServices.userNameAndEmailIdInUse(
        username
      );
      const emailIdInUse = await UserServices.userNameAndEmailIdInUse(email);
      if (userNameInUse.data.data.code === "IN_USE") {
        setisLoading(false);
        ErrorToast(userNameInUse.data.data.message);
      } else if (emailIdInUse.data.data.code === "IN_USE") {
        setisLoading(false);
        ErrorToast("Email Id alredy in use");
      } else {
        const user = await UserServices.registerUser(
          fullname,
          username,
          email,
          mobilenumber,
          address,
          password,
          Confirmpassword
        );
        if (user.data.code === 200) {
          setisLoading(false);
          props.history.push(`/login`);
        } else {
          setisLoading(false);
          ErrorToast(user.data.message);
        }
      }
    }
  };

  return (
    <div>
      <div>
        <div class="signup_main">
          {/* <!-- create an account part --> */}
          <div class="signup_section">
            <div class="Account_details">
              <div>
                <div class="create_head">
                  <h2> Create an Account </h2>
                </div>

                <input
                  type="text"
                  placeholder="Full Name"
                  class="input_signup"
                  onChange={(e) => setfullname(e.target.value)}
                />
                <br />
                <p>{nameerror}</p>
                <input
                  type="text"
                  placeholder="username"
                  class="input_signup"
                  onChange={(e) => setusername(e.target.value)}
                />
                <br />
                <p> {usernameerror} </p>
                <input
                  type="email"
                  placeholder="Email"
                  class="input_signup"
                  onChange={(e) => setemail(e.target.value)}
                />
                <br />
                {emailerror}
                <input
                  type="number"
                  placeholder="Contact no"
                  class="input_signup"
                  onChange={(e) => setmobilenumber(e.target.value)}
                />
                <br />
                {mobilenumbererror}
                <input
                  type="text"
                  placeholder="Address"
                  class="input_signup"
                  onChange={(e) => setaddress(e.target.value)}
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  class="input_signup"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <br />
                {pwderror}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  class="input_signup"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <br />
                {confirmpwderror}
                {/* <Link to=""> */}
                {isLoading ? (
                  <div style={{ textAlign: "center" }}>
                    <Loaderring />
                  </div>
                ) : (
                  <button class="signup_signup" onClick={LoginHandler}>
                    {" "}
                    Sign Up{" "}
                  </button>
                )}
                {/* </Link> */}
                <div class="signup_bottom">
                  <h2>
                    {" "}
                    Already have an account ?{" "}
                    <Link to="/login">
                      {" "}
                      <p> Sign in </p>
                    </Link>{" "}
                  </h2>
                  <h6>
                    <u> Privacy policy</u> and <u> Privacy policy</u>{" "}
                  </h6>
                </div>
              </div>
            </div>
            {/* <!-- image part --> */}
            <div class="signup_image">
              <img
                class="bubbles"
                src={RegisterImage}
                width="525px"
                height="861px"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
