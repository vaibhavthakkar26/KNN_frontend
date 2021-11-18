import React, { useState } from "react";
import "./login.css";
import "react-toastify/dist/ReactToastify.css";
import ErrorToast from "../../comman/ErrorToast";
import { ToastContainer, toast } from "react-toastify";
import AuthServices from "../../services/auth.services";
import Loaderring from "../../comman/Loader";
import LoginImage from "../../assets/image/signin.jpg";
import CommanService from "../../services/comman.service";
import { Link } from "react-router-dom";

toast.configure();
function Login(props) {
  const [email, setemail] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [password, setpassword] = useState("");
  const [passworderror, setpassworderror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  let isFormValid = true;
  const loginvalidation = () => {
    if (email.trim().length === 0) {
      setemailerror("your email id is empty");
      isFormValid = false;
    }
    if (password.trim().length === 0) {
      setpassworderror("your password can not be empty");
      isFormValid = false;
    } else {
      return isFormValid;
    }
    // else{
    //     setisLoading(true);
    // }
  };

  const onLogin = async () => {
    if (loginvalidation()) {
      setisLoading(true);
      const doLogin = await AuthServices.doLogin(email, password);
      console.log("doLogin.data", doLogin.data);
      if (doLogin.data.code === 200) {
        localStorage.setItem("accessToken", doLogin.data.data.accessToken);
        localStorage.setItem("refreshToken", doLogin.data.data.refreshToken);
        const token = doLogin.data.data.accessToken;
        const decodetoken = await CommanService.decodeJWTToken(token);
        console.log(decodetoken);
        setisLoading(false);
        if (decodetoken.Role === "Platform Admin") {
          props.history.push(`/admindashboard`);
        }
        if (
          decodetoken.Role === "User" &&
          decodetoken.subscriptionDone === false &&
          decodetoken.verify === false
        ) {
          props.history.push(`/joincommunity`);
        } else if (
          decodetoken.Role === "User" &&
          decodetoken.subscriptionDone === true &&
          decodetoken.verify === false
        ) {
          props.history.push(`/`);
        } else if (
          decodetoken.Role === "Member" &&
          decodetoken.subscriptionDone === true &&
          decodetoken.verify === true
        ) {
          props.history.push(`/`);
        }
      } else {
        setpassworderror("");
        setemailerror("");
        ErrorToast(doLogin.data.message);
        setisLoading(false);
      }
    }

    // const doLogin = await AuthServices.doLogin(email, password);
    // console.log("doLogin.data", doLogin.data);
    // localStorage.setItem("accessToken", doLogin.data.data.accessToken);
    // localStorage.setItem("refreshToken", doLogin.data.data.refreshToken);
    // setisLoading(false);
  };

  return (
    <div>
      <div class="sign_in">
        <div class="sign_in_main">
          <div class="Login_imagesec">
            <img class="Login_image" src={LoginImage} alt="" />
          </div>
          <div class="Login_section">
            <h2 class="Login_head"> Sign in to your Account </h2>
            <br />
            <div class="email_password_section">
              <div class="email_ID">
                <label>Email id</label> <br />
                <input
                  type="email"
                  placeholder="Your Email address"
                  class="input_signin"
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
                <p
                  style={{
                    position: "relative",
                    top: "-32px",
                    left: "6px",
                    color: "red",
                  }}
                >
                  {" "}
                  {emailerror}
                </p>
              </div>
              <div>
                <label> password </label> <br />
                <input
                  type="password"
                  placeholder="Your password"
                  class="input_signin"
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
                <p
                  style={{
                    position: "relative",
                    top: "-32px",
                    left: "6px",
                    color: "red",
                  }}
                >
                  {passworderror}
                </p>
              </div>
              <div class="cheackBox_section">
                <input type="checkbox" class="Login_Remember" /> Remember me
                <Link to="/forgotpassword" class="Login_restpassword">
                  {" "}
                  Forgot Password ?
                </Link>
              </div>
              {isLoading ? (
                <div style={{ textAlign: "center" }}>
                  <Loaderring />
                </div>
              ) : (
                <button class="Login_button" onClick={onLogin}>
                  {" "}
                  Sign in{" "}
                </button>
              )}
              <p class="Signin_footer_text">
                {" "}
                Don't have an account ?{" "}
                <Link to="/Register">
                  {" "}
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bolder",
                      color: "#0055B3",
                    }}
                  >
                    {" "}
                    Sign Up{" "}
                  </span>{" "}
                </Link>
              </p>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
