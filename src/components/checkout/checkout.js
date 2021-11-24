/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import "./checkout.css";
import sewa from "../../assets/image/kisspng-esewa-fonepay-pvt-ltd-logo-portable-network-grap-index-of-inheadline-public-assets-uploads-newsup-5b6df612161f19 1.png";
import khalti from "../../assets/image/Khalti_Digital_Wallet_Logo 1.png";
import Ips from "../../assets/image/connectipslogo 1.png";
import Ime from "../../assets/image/ime-pay 1.png";
import Specialevent from "../../comman/Specialevent";
import Header from "../../components/navbar/navbar";
import CommanService from "../../services/comman.service";
import Footer from "../../components/footer/Footer";
import queryString from "query-string";
import UserServices from "../../services/user.services";
import SuccessToast from "../../comman/SuccessToast";
import ErrorToast from "../../comman/ErrorToast";
import { toast } from "react-toastify";
toast.configure();
function checkout(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");

  const { total } = queryString.parse(props.location.search);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      if (token === null || token === undefined) {
        props.history.push(`/`);
      }
    };
    fetchData();
  }, []);

  async function onDone() {
    const decodetoken = await CommanService.decodeJWTToken(token);
    if (
      decodetoken.Role === "Member" &&
      decodetoken.subscriptionDone === true &&
      decodetoken.verify === true
    ) {
      // props.history.push(`/`);
      const pay = await UserServices.checkout(
        decodetoken.id,
        firstName,
        lastName,
        emailId,
        contactNo,
        address,
        total
      );
      if (pay.status === 200) {
        SuccessToast(pay.data.message);
      } else {
        ErrorToast(pay.data.message);
      }
    } else {
      props.history.push(`/`);
    }
  }
  return (
    <div>
      <Header />
      <div className="main_checkout_section">
        <h2>Buyer Info</h2>
        <div className="fl_section">
          <input
            type="text"
            className="checkout_input"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="checkout_input1"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="sl_section">
          <input
            type="text"
            className="checkout_input"
            placeholder="Email"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            type="text"
            className="checkout_input1"
            placeholder="Contact No"
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
        <div className="sl_section">
          <input
            type="text"
            className="checkout_input2"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="checkout_deposit_area">
        <div className="payment_information_deposit_checkout">
          <h2> For payment, send Nrs. {total} to esewa or Khalti </h2>
        </div>
        <div className="payment_with_deposit_checkout">
          <h2> esewa/Khalti ID: 9861446103 </h2>
          <input type="checkbox" value="" name="" />
          <label>
            {" "}
            I agree to the Privacy Policy and Terms & Conditions of the
            organization.
          </label>
        </div>
      </div>

      <div className="cash_delivery_area">
        <h3>
          OR,<span style={{ color: "red" }}>Cash on Delivery</span>
        </h3>
        <button className="continue_btn" onClick={() => onDone()}>
          CONTINUE
        </button>
      </div>

      {/* special event */}

      <Specialevent />
      <svg
        width="85"
        height="95"
        viewBox="0 0 85 95"
        fill="none"
        style={{ position: "absolute", right: "10px", top: "1114px" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M85 47.2868L0.250003 94.3006L0.250007 0.273052L85 47.2868Z"
          fill="#0055B3"
          fill-opacity="0.28"
        />
      </svg>
      <Footer />
    </div>
  );
}

export default checkout;
