/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Loaderring from "../../comman/Loader";
import MembershipService from "../../services/membershipPlan.services";
import ErrorToast from "../../comman/ErrorToast";
import "./joincommunity.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/navbar/navbar";
import CommanService from "../../services/comman.service";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();
function joincommunity(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [membership, setMembership] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const decodetoken = await CommanService.decodeJWTToken(token);
      if (token === undefined || token === null) {
        props.history.push(`/login`);
      }
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
      setisLoading(true);
      const getPlans = await MembershipService.getMembershipPlan(token);

      if (getPlans.status === 200) {
        setMembership(getPlans.data.data);
        console.log("getPlans", membership);
      } else if (getPlans.status === 401) {
        ErrorToast(getPlans.data);
        props.history.push(`/login`);
      }
      setisLoading(false);
    };
    fetchData();
  }, []);

  const onSelectPlan = (id, type) => {
    if (type === "BOOK") {
      props.history.push(`/memberwithbook?id=${id}`);
    }
    if (type === "DEPOSITE") {
      props.history.push(`/membershipwithdeposit?id=${id}`);
    }
  };
  return (
    <div>
       <Header />
      <div className="main_join_community">
        <div className="community_knowledge">
          <div className="one_main_join_community">
            <h2> JOIN THE COMMUNITY OF KNOWEDGE </h2>
          </div>
          <div className="second_main_join_community">
            <h2> BECOME A MEMBER </h2>
          </div>
          <div className="third_main_join_community">
            {isLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              membership.map((plan) => (
                <div
                  className={
                    plan.type === "BOOK"
                      ? `first_child_third`
                      : `second_child_third`
                  }
                  onClick={() => onSelectPlan(plan.id, plan.type)}
                >
                  <h2>{plan.title} </h2>
                  <p>{plan.description}</p>
                  <p>
                    {" "}
                    {plan.type === "BOOK"
                      ? `${plan.noOfBook} Books`
                      : `Rs. ${plan.deposite} Deposit`}{" "}
                  </p>
                  <p>Rs. {plan.price} Fix Price</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default joincommunity;
