import React, { useEffect, useState } from "react";
import cartImage from "../../assets/image/conversation (1) 5.svg";
import Rectangle9 from "../../assets/image/Rectangle 9.png";
import "./cart.css";
import Header from "../../components/navbar/navbar";
import fast1 from "../../assets/image/fast 1.svg";
import coffe_cup from "../../assets/image/coffee-cup 1.svg";
import like from "../../assets/image/like 1.svg";
import UserServices from "../../services/user.services";
import Loaderring from "../../comman/Loader";
import ErrorToast from "../../comman/ErrorToast";
import CommanService from "../../services/comman.service";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
toast.configure();
function Cart(props) {
  const [books, setBooks] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [total, setTotal] = useState(0);

  async function getCart() {
    const token = localStorage.getItem("accessToken");
    if (token === null || token === undefined) {
      ErrorToast("Please do login");
      props.history.push(`/login`);
    } else {
      const decodetoken = await CommanService.decodeJWTToken(token);
      const userId = decodetoken.id;
      setisLoading(true);
      const cart = await UserServices.getCartByUserId(userId);
      console.log("cart", cart);

      await setBooks(cart.data.data);
      console.log(books);
      setisLoading(false);
      let totalRs = parseInt(0);
      for (let i = 0; i < cart.data.data.length; i++) {
        console.log(i, cart.data.data[i].Book.price);
        totalRs = parseInt(totalRs) + parseInt(cart.data.data[i].Book.price);
      }

      setTotal(totalRs);
      console.log("Total: ", total);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getCart();
    };
    fetchData();
  }, []);

  async function deleteCartItem(cartId) {
    setisLoading(true);
    const deleteCart = await UserServices.deleteCartItem(cartId);
    if (deleteCart.status === 200) {
      await getCart();
      setisLoading(false);
    } else {
      ErrorToast(deleteCart.data.message);
      setisLoading(false);
    }
  }

  async function onCheckout() {
    if (books.length !== 2) {
      ErrorToast("You can just order Two books in single order.");
    } else {
      const token = localStorage.getItem("accessToken");
      const decodetoken = await CommanService.decodeJWTToken(token);
      const userId = decodetoken.id;
      if (
        decodetoken.Role === "User" &&
        decodetoken.subscriptionDone === false &&
        decodetoken.verify === false
      ) {
        props.history.push(`/joincommunity`);
      }
      if (
        decodetoken.Role === "Member" &&
        decodetoken.subscriptionDone === true &&
        decodetoken.verify === true
      ) {
        props.history.push(`/checkout?total=${total}`);
      }
      if (
        decodetoken.Role === "User" &&
        decodetoken.subscriptionDone === true &&
        decodetoken.verify === false
      ) {
        ErrorToast(
          "Your subscription purchase is not verify. Please contact Administrative."
        );
      }
      if (
        decodetoken.Role === "User" &&
        decodetoken.subscriptionDone === false &&
        decodetoken.verify === false
      ) {
        props.history.push(`/joincommunity`);
      }
    }
  }
  return (
    <div>
       <Header />
      <div>
        {isLoading ? (
          <div style={{ marginLeft: "123px" }}>
            <Loaderring />
          </div>
        ) : (
          <div>
            {books ? (
              books.map((book) => (
                <div className="cart_item_area">
                  <img
                    src={book.Book.titleImage}
                    alt=""
                    style={{ width: "195px", height: "292px" }}
                  />
                  <div className="cart_area_cart">
                    <div className="book_details_cart">
                      <button
                        className="cart_cancel"
                        onClick={() => deleteCartItem(book.id)}
                      >
                        {" "}
                        X{" "}
                      </button>
                      <h2> {book.Book.bookName}</h2>
                      <div className="star_cart">
                        <svg
                          width="25"
                          height="23"
                          viewBox="0 0 25 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5489 0.927054C11.8483 0.00574327 13.1517 0.00573969 13.4511 0.92705L15.5309 7.32827C15.6648 7.74029 16.0488 8.01925 16.482 8.01925L23.2126 8.01925C24.1814 8.01925 24.5841 9.25887 23.8004 9.82827L18.3552 13.7844C18.0047 14.0391 17.8581 14.4905 17.9919 14.9025L20.0718 21.3037C20.3712 22.225 19.3167 22.9911 18.533 22.4217L13.0878 18.4656C12.7373 18.2109 12.2627 18.2109 11.9122 18.4656L6.46701 22.4217C5.6833 22.9911 4.62882 22.225 4.92817 21.3037L7.00805 14.9025C7.14193 14.4905 6.99527 14.0391 6.64478 13.7844L1.19958 9.82827C0.415862 9.25887 0.81864 8.01925 1.78736 8.01925L8.51801 8.01925C8.95123 8.01925 9.33519 7.74029 9.46906 7.32827L11.5489 0.927054Z"
                            fill="#FFC106"
                          />
                        </svg>
                        <svg
                          width="25"
                          height="23"
                          viewBox="0 0 25 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5489 0.927054C11.8483 0.00574327 13.1517 0.00573969 13.4511 0.92705L15.5309 7.32827C15.6648 7.74029 16.0488 8.01925 16.482 8.01925L23.2126 8.01925C24.1814 8.01925 24.5841 9.25887 23.8004 9.82827L18.3552 13.7844C18.0047 14.0391 17.8581 14.4905 17.9919 14.9025L20.0718 21.3037C20.3712 22.225 19.3167 22.9911 18.533 22.4217L13.0878 18.4656C12.7373 18.2109 12.2627 18.2109 11.9122 18.4656L6.46701 22.4217C5.6833 22.9911 4.62882 22.225 4.92817 21.3037L7.00805 14.9025C7.14193 14.4905 6.99527 14.0391 6.64478 13.7844L1.19958 9.82827C0.415862 9.25887 0.81864 8.01925 1.78736 8.01925L8.51801 8.01925C8.95123 8.01925 9.33519 7.74029 9.46906 7.32827L11.5489 0.927054Z"
                            fill="#FFC106"
                          />
                        </svg>
                        <svg
                          width="25"
                          height="23"
                          viewBox="0 0 25 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5489 0.927054C11.8483 0.00574327 13.1517 0.00573969 13.4511 0.92705L15.5309 7.32827C15.6648 7.74029 16.0488 8.01925 16.482 8.01925L23.2126 8.01925C24.1814 8.01925 24.5841 9.25887 23.8004 9.82827L18.3552 13.7844C18.0047 14.0391 17.8581 14.4905 17.9919 14.9025L20.0718 21.3037C20.3712 22.225 19.3167 22.9911 18.533 22.4217L13.0878 18.4656C12.7373 18.2109 12.2627 18.2109 11.9122 18.4656L6.46701 22.4217C5.6833 22.9911 4.62882 22.225 4.92817 21.3037L7.00805 14.9025C7.14193 14.4905 6.99527 14.0391 6.64478 13.7844L1.19958 9.82827C0.415862 9.25887 0.81864 8.01925 1.78736 8.01925L8.51801 8.01925C8.95123 8.01925 9.33519 7.74029 9.46906 7.32827L11.5489 0.927054Z"
                            fill="#FFC106"
                          />
                        </svg>
                        <svg
                          width="25"
                          height="23"
                          viewBox="0 0 25 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5489 0.927054C11.8483 0.00574327 13.1517 0.00573969 13.4511 0.92705L15.5309 7.32827C15.6648 7.74029 16.0488 8.01925 16.482 8.01925L23.2126 8.01925C24.1814 8.01925 24.5841 9.25887 23.8004 9.82827L18.3552 13.7844C18.0047 14.0391 17.8581 14.4905 17.9919 14.9025L20.0718 21.3037C20.3712 22.225 19.3167 22.9911 18.533 22.4217L13.0878 18.4656C12.7373 18.2109 12.2627 18.2109 11.9122 18.4656L6.46701 22.4217C5.6833 22.9911 4.62882 22.225 4.92817 21.3037L7.00805 14.9025C7.14193 14.4905 6.99527 14.0391 6.64478 13.7844L1.19958 9.82827C0.415862 9.25887 0.81864 8.01925 1.78736 8.01925L8.51801 8.01925C8.95123 8.01925 9.33519 7.74029 9.46906 7.32827L11.5489 0.927054Z"
                            fill="#FFC106"
                          />
                        </svg>
                        <svg
                          width="25"
                          height="23"
                          viewBox="0 0 25 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5489 0.927054C11.8483 0.00574327 13.1517 0.00573969 13.4511 0.92705L15.5309 7.32827C15.6648 7.74029 16.0488 8.01925 16.482 8.01925L23.2126 8.01925C24.1814 8.01925 24.5841 9.25887 23.8004 9.82827L18.3552 13.7844C18.0047 14.0391 17.8581 14.4905 17.9919 14.9025L20.0718 21.3037C20.3712 22.225 19.3167 22.9911 18.533 22.4217L13.0878 18.4656C12.7373 18.2109 12.2627 18.2109 11.9122 18.4656L6.46701 22.4217C5.6833 22.9911 4.62882 22.225 4.92817 21.3037L7.00805 14.9025C7.14193 14.4905 6.99527 14.0391 6.64478 13.7844L1.19958 9.82827C0.415862 9.25887 0.81864 8.01925 1.78736 8.01925L8.51801 8.01925C8.95123 8.01925 9.33519 7.74029 9.46906 7.32827L11.5489 0.927054Z"
                            fill="#FFC106"
                          />
                        </svg>
                        <p>
                          {" "}
                          {book.Book.avgRating === null
                            ? 0
                            : book.Book.avgRating}
                        </p>
                        <img
                          src={cartImage}
                          className="reviews_cart"
                          width="21px"
                          height="21px"
                          alt=""
                        />{" "} 
                        <h4> {book.Book.BookReview.length} reviews </h4>
                        <img
                          src={like}
                          alt=""
                          className="like_cart"
                          width="23px"
                          height="23px"
                        />
                        {book.Book.BookLikeDislike.length}
                      </div>

                      <hr className="line_1" />

                      <div className="cart_book_price">
                        <h3> RS.{book.Book.price} </h3>
                        {/* <h4> 2% </h4> */}
                        <div className="quantity_cart">
                          <button className="minius_cart"> - </button>
                          <input
                            name="quantity_value"
                            type="text"
                            value="1"
                            className="quantity_input"
                          />
                          <button className="plus_cart"> + </button>
                        </div>
                        <div className="procces_area">
                          <button className="procced_cart_btn"> proceed </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            )}
          </div>
        )}

        {/* amount_are */}

        <div className="cart_amount_area">
          <h2> TOTAL: Rs. {total}</h2>
        </div>

        {/* instruction_for_member */}
        <div class="instruction_area">
          <textarea
            placeholder="special instruction for member"
            class="instruction_member_area"
          />
          <svg
            width="111"
            height="111"
            class="round_circle_cart"
            viewBox="0 0 111 111"
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
        </div>

        {/* <div>
        <svg width="138" height="629" viewBox="0 0 138 629" fill="none" class="cart_circle_instruction" xmlns="http://www.w3.org/2000/svg">
                <circle cx="314.5" cy="314.5" r="302" stroke="#FFC106" stroke-opacity="0.25" stroke-width="25"/>
            </svg>
        </div> */}

        <div class="book_delivery_area">
          <div class="main_online_delivery_cart">
            <div class="online_delivery_cart">
              <img src={fast1} alt="" />
            </div>
            <h6> ONLINE DELIVERY </h6>
          </div>

          <div class="main_book_cafe">
            <div class="book_cafe">
              <img src={coffe_cup} alt="" />
            </div>
            <h6> COLLECT FROM BOOK CAFE </h6>
          </div>
        </div>

        <div class="cart_checkout_btn">
          <button class="checkout_btn_cart1" onClick={() => onCheckout()}>
            {" "}
            CHECKOUT
          </button>
        </div>
        <div class="play_svg_cart">
          <svg
            width="117"
            height="130"
            viewBox="0 0 117 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117 64.9446L-6.36219e-06 129.849L-4.56785e-07 0.040675L117 64.9446Z"
              fill="#0055B3"
              fill-opacity="0.28"
            />
          </svg>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
