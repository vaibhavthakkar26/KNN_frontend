import React, { useEffect, useState } from "react";
import "./membershipwithdeposit.css";
import queryString from "query-string";
import CommanService from "../../services/comman.service";
import MembershipService from "../../services/membershipPlan.services";
import ErrorToast from "../../comman/ErrorToast";
import Loaderring from "../../comman/Loader";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/navbar/navbar";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
toast.configure();

function Membershipwithdeposit(props) {
  const { id } = queryString.parse(props.location.search);
  const [userid, setUserid] = useState();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const decodetoken = await CommanService.decodeJWTToken(token);
      if (
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

      setUserid(decodetoken.id);
    };
    fetchData();
  }, []);

  const onComplete = async () => {
    setisLoading(true);
    const titleImages = [];
    const bookNames = [];
    const authorNames = [];
    const userId = userid;
    const subscriptionId = id;

    // await getBase64(titleImage[0]).then((result) => {
    titleImages.push("");
    // });
    // await getBase64(titleImage1[0]).then((result) => {
    titleImages.push("");
    // });
    // await getBase64(titleImage2[0]).then((result) => {
    titleImages.push("");
    // });

    bookNames.push("", "", "");
    authorNames.push("", "", "");
    console.log("bookNames", bookNames);
    console.log("authorNames", authorNames);
    console.log("titleImages", titleImages);

    const buySubcription = await MembershipService.userBuySubscription(
      userId,
      subscriptionId,
      bookNames,
      authorNames,
      titleImages
    );
    console.log("buySubcription", buySubcription);
    if (buySubcription.status === 400) {
      console.log("in error", buySubcription.data.message);
      ErrorToast(buySubcription.data.message);
      setisLoading(false);
    } else if (buySubcription.status === 200) {
      setisLoading(false);
      localStorage.setItem("accessToken", buySubcription.data.data.accessToken);
      localStorage.setItem(
        "refreshToken",
        buySubcription.data.data.refreshToken
      );
      props.history.push(`/`);
    }
  };
  return (
    <div>
      <Header/>
      <div class="with_deposit_main">
        <div class="deposit_with_deposit_heading">
          <h1>With Deposit</h1>{" "}
          <p>
            **Please pay Rs. 1200 [Rs. 1000 as deposit & Rs. 200 as membership
            charge] in order to become a member of KNN Community.
          </p>
        </div>

        <div class="payment_with_deposit">
          <h2> For payment, send Nrs. 1200 to esewa or Khalti </h2>
        </div>

        <div class="payment_information_deposit">
          <h2> esewa/Khalti ID: 9861446103 </h2>
          {/* <input type="checkbox" value="" name="" />
          <label>
            {" "}
            I agree to the Privacy Policy and Terms & Conditions of the
            organization.
          </label> */}
        </div>

        <div class="complete_btn_area_with_deposit">
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Loaderring />
            </div>
          ) : (
            <button class="complete_btn_" onClick={onComplete}>
              {" "}
              Complete{" "}
            </button>
          )}

          <p>
            Do you have 3 Books ? <span> With Books </span>{" "}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Membershipwithdeposit;
