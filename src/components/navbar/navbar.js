/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import "./navbar.css";
import phonecall from "../../assets/image/phone-call 1.svg";
import pincall from "../../assets/image/pin (1) 1.svg";
import knnlogo from "../../assets/image/knnwhitelogo 1.png";
import profilepicture from "../../assets/image/Ellipse 74.png";
import { Link } from "react-router-dom";
import CommanService from "../../services/comman.service";
import shopcart from "../../assets/image/shoppingcart1.png";
import UserServices from "../../services/user.services";

function navbar(props) {
  const [userName, setUserName] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [books, setBooks] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("accessToken");
      if (token === null || token === undefined) {
        setIsLogin(false);
      } else {
        let decodetoken = await CommanService.decodeJWTToken(token);
        if (decodetoken.Role === "Platform Admin") {
          props.history.push(`/admindashboard`);
        }
        const updatedToken = await UserServices.getUpdatedTokens(
          decodetoken.id
        );
        console.log("updatedToken", updatedToken);
        localStorage.setItem("accessToken", updatedToken.data.data.accessToken);
        localStorage.setItem(
          "refreshToken",
          updatedToken.data.data.refreshToken
        );
        token = localStorage.getItem("accessToken");
        decodetoken = await CommanService.decodeJWTToken(token);
        setUserName(decodetoken.firstName);

        const cart = await UserServices.getCartByUserId(decodetoken.id);
        console.log("cart", cart);

        await setBooks(cart.data.data);

        setIsLogin(true);
      }
    };
    fetchData();
  }, []);

  function onLogout() {
    localStorage.clear();
    // console.log("props", props);
    // props.history.push("/login");
  }
  return (
    <div>
      <div class="main_navbar">
        <div class="Logo_area">
          <img src={knnlogo} alt="" />
        </div>
        <div class="navbar_menubar">
          <div class="loction_call">
            {/* <img src={{phonecall}} alt="" width="17px" height="17px" /> */}
            <h2> 9861-446-103</h2>
            {/* <img src={{pincall}} alt="" width="17px" height="17px"/> */}
            <h2> KATHMANDU,NEPAL</h2>
          </div>
          <div class="menu_section">
            <Link to="/">
              <li> HOME </li>
            </Link>
            <Link to="/blog">
              <li> BLOG </li>
            </Link>
            <Link to="/discuss">
              <li> DISCUSSION FORUM </li>
            </Link>
            <Link to="/event">
              <li> EVENTS</li>
            </Link>
          </div>
        </div>
        <div class="cart_section">
          {isLogin ? (
            <>
              <div class="account_wishlist">
                <h3>ACCOUNT &nbsp; | </h3>
                <h3> &nbsp; WISHLIST</h3>
              </div>
              <div class="cart_one_part">
                <Link to="/myprofile">
                  <img src={profilepicture} alt="" />
                </Link>
                <div class="cart_logout">
                  <p> hello !</p>
                  <h4> {userName}</h4>
                  <Link to="/login">
                    <button class="logout_btn" onClick={() => onLogout()}>
                      {" "}
                      Logout{" "}
                    </button>
                  </Link>
                </div>
                <Link to="/cart">
                  <div class="main_car_user">
                    {/* <div class="notfi_area_counter">
                          0
                      </div> */}
                    <div class="cart_user">
                      <img
                        src={shopcart}
                        class="cart_svg_section"
                        width="30px"
                        height="30px"
                        alt=""
                      />
                      <h6> MY CART </h6>
                    </div>
                  </div>
                </Link>
                <div class="notfi_counter">
                  <span> {books.length}</span>
                </div>
              </div>
            </>
          ) : (
            <div class="signup_create_area">
              <div class="sign_in_">
                {" "}
                <Link to="/login">
                  <h3> Sign in </h3>
                </Link>{" "}
              </div>
              <div class="_login_">
                {" "}
                <Link to="/Register">
                  <h3> Create Account </h3>
                </Link>{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default navbar;
