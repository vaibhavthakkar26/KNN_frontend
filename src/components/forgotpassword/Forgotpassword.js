import React, { useState } from "react";
import "../forgotpassword/Forgotpassword.css";
import Fp from "../../assets/image/FP.png";
import AuthServices from "../../services/auth.services";
import SuccessToast from "../../comman/SuccessToast";
import ErrorToast from "../../comman/ErrorToast";
import Loaderring from "../../comman/Loader";
import { toast } from "react-toastify";
toast.configure();

function Forgotpassword() {
  const [isLoading, setisLoading] = useState(false);
  const [emailId, setEmailId] = useState("");

  async function onSubmit() {
    setisLoading(true);
    const forgotpassword = await AuthServices.forgotPassword(emailId);
    if (forgotpassword.status === 200) {
      SuccessToast(forgotpassword.data.message);
    } else {
      ErrorToast(forgotpassword.data.message);
    }
    setisLoading(false);
  }
  return (
    <div>
      <div class="forgot_pass_main">
        <div class="forgot_password_one">
          <img src={Fp} alt="" />
        </div>
        <div class="forgot_password_second_">
          <div class="heading_forgot_pass">
            <h3>Forgot Your Password</h3>
            <p>Enter Your email address below to reset your password</p>
          </div>
          <div class="email_area_fp">
            <label> Email</label>
            <input
              type="email"
              placeholder="Your Email"
              class="input_signup_fp"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div class="continue_btn_fp">
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <Loaderring />
              </div>
            ) : (
              <button class="btn_btn_fp" onClick={() => onSubmit()}>
                {" "}
                continue{" "}
              </button>
            )}
          </div>

          <div class="create_account_fp">
            <p>
              {" "}
              <p>
                {" "}
                Don't have an account ?
                <span class="signup_fp_area"> Sign up</span>
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;
