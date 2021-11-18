import React, { useState } from "react";
import "../restpassword/Restpassword.css";
import eye from "../../assets/image/eye 1.svg";
import Fp from "../../assets/image/FP.png";
import queryString from "query-string";
import AuthServices from "../../services/auth.services";
import SuccessToast from "../../comman/SuccessToast";
import ErrorToast from "../../comman/ErrorToast";
import Loaderring from "../../comman/Loader";
import { toast } from "react-toastify";
toast.configure();
function Restpassword(props) {
  const [isLoading, setisLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { userId } = queryString.parse(props.location.search);
  const { nonce } = queryString.parse(props.location.search);

  async function onSubmit() {
    setisLoading(true);
    const reset = await AuthServices.resetPassword(userId, nonce, password);
    if (reset.status === 200) {
      SuccessToast(reset.data.message);
      localStorage.clear();
      props.history.push(`/login`);
    } else {
      ErrorToast(reset.data.message);
    }
    setisLoading(false);
  }
  return (
    <div>
      <div class="main_rest_password">
        <div class="restpass_one">
          <img src={Fp} alt="" />
        </div>
        <div class="restpass_two">
          <div class="r_p">
            <h3> Rest your Password</h3>
            <p>create a strong password that is at least 8 characters long </p>
          </div>

          <div class="rest_pass_and_confrim">
            <div class="res_pass_password">
              <label> new password</label>
              <input
                type="password"
                placeholder="your new password"
                class="input_signup_rp"
                onChange={(e) => setPassword(e.target.value)}
              />
              <img src={eye} alt="" class="eye_svg_ress_pass" />
            </div>
            <br />
            {/* <div class="res_pass_confrimpassword">
              <label> confrim password </label>
              <input
                type="password"
                placeholder="your new password"
                class="input_signup_rp"
              />
              <img src={eye} alt="" class="eye_svg_ress_pass" />
            </div> */}
          </div>

          <div class="continue_btn_rp">
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <Loaderring />
              </div>
            ) : (
              <button class="btn_btn_rp" onClick={() => onSubmit()}>
                {" "}
                Reset Password{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restpassword;
