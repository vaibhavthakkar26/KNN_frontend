import React, { useEffect, useState } from "react";
import bookinside from "../../assets/image/Rectangle 9.png";
import Header from "../../components/navbar/navbar";

import SuccessToast from "../../comman/SuccessToast";
import "./Bookin.css";
import queryString from "query-string";
import writterpicture from "../../assets/image/Ellipse 75.png";
import cartImage from "../../assets/image/conversation (1) 5.svg";
import like from "../../assets/image/like 1.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookServices from "../../services/book.services";
import UserServices from "../../services/user.services";
import Loaderring from "../../comman/Loader";
import Footer from "../../components/footer/Footer";
import CommanService from "../../services/comman.service";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import ErrorToast from "../../comman/ErrorToast";
toast.configure();

function Bookin(props) {
  const [book, setBook] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [qty, setQty] = useState(1);

  let { bookId } = queryString.parse(props.location.search);

  async function getBookById() {
    setisLoading(true);
    const getbook = await BookServices.getBookById(bookId);
    console.log("Cat in Book Js", getbook);
    setBook(getbook.data.data);
    setisLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      // const token = localStorage.getItem("accessToken");
      // if (token === null || token === undefined) {
      //   ErrorToast("Please do login");
      // }
      await getBookById();
    };
    fetchData();
  }, []);

  async function addToCart() {
    const token = localStorage.getItem("accessToken");
    if (token === null || token === undefined) {
      ErrorToast("Please do login");
    } else {
      const decodetoken = await CommanService.decodeJWTToken(token);
      const userId = decodetoken.id;
      console.log(book.stock, "book.stock");
      if (book.stock <= 0) {
        ErrorToast("Out of Stock");
      } else {
        const addtocart = await UserServices.addToCart(userId, bookId, qty);
        console.log("addtocart", addtocart.status);
        if (addtocart.status === 400) {
          ErrorToast(addtocart.data.message);
          // props.history.push(`/`);
        } else {
          SuccessToast(addtocart.data.message);
          await getBookById();
        }
      }
    }
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <div style={{ marginLeft: "123px" }}>
          <Loaderring />
        </div>
      ) : (
        <div>
          {book ? (
            <div>
              {" "}
              <diV className="book_inside_main">
                <div className="image_book_inside">
                  <img
                    src={book.titleImage}
                    alt={book.bookName}
                    width="327"
                    height="490"
                    style={{border:"1px solid black"}}
                  />
                </div>
                <div className="book_inside_description">
                  <div className="child_one_description">
                    <h1> {book.bookName}</h1>
                    <div className="star_cart" style={{ margin: "0" }}>
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
                      <p> {book.avgRating}</p>
                      <img
                        src={cartImage}
                        className="reviews_cart"
                        width="21px"
                        height="21px"
                        alt=""
                      />{" "}
                      {book.BookReview.length} reviews
                      <img
                        src={like}
                        alt=""
                        className="like_cart"
                        width="23px"
                        height="23px"
                      />
                      {book.BookLikeDislike.length}
                      <div className="stocks_update_bookinside">
                        <h4>{book.stock > 0 ? "in Stocks" : "out of Stock"}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="child_two_description">
                    <p>{book.description}</p>
                  </div>
                  <div className="writter_area_book_inside">
                    <img
                      src={book.BookAuthor.profilePicture}
                      alt={book.BookAuthor.name}
                    />
                    <div className="writter_name">
                      <h2> Written By:</h2>
                      <p> {book.BookAuthor.name}</p>
                    </div>
                  </div>
                  <hr
                    style={{ border: "1px solid #C4C4C4", marginTop: "40px" }}
                  />
                  <div className="cart_book_price">
                    <h2> RS.{book.price} </h2>
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
                      <button
                        className="procced_cart_btn"
                        onClick={() => addToCart()}
                      >
                        {" "}
                        Add To Cart{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </diV>
              <div className="book_details">
                <div className="main_details_book_indi">
                  <div className="Details_main_head">
                    <h2> Details </h2>
                  </div>
                  <div className="book_info_book_details">
                    <div className="container_book_inside_">
                      <div className="boot_deatils_category">
                        <div className="heading_titles">
                          <h2> Book </h2>
                        </div>
                        <div className="details_details_user">
                          <p> {book.bookName} </p>
                        </div>
                      </div>
                      <div className="boot_deatils_category">
                        <div className="heading_titles">
                          <h2> Author </h2>
                        </div>
                        <div className="details_details_user">
                          <p> {book.BookAuthor.name} </p>
                        </div>
                      </div>
                      <div className="boot_deatils_category">
                        <div className="heading_titles">
                          <h2> ISBN </h2>
                        </div>
                        <div className="details_details_user">
                          <p> {book.isbn} </p>
                        </div>
                      </div>
                      <div className="boot_deatils_category">
                        <div className="heading_titles">
                          <h2> Book Format </h2>
                        </div>
                        <div className="details_details_user">
                          <p> {book.pages} Pages </p>
                        </div>
                      </div>
                      <div className="boot_deatils_category">
                        <div className="heading_titles">
                          <h2> Description </h2>
                        </div>
                        <div className="details_details_user">
                          <p> {book.description} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ marginLeft: "123px" }}>
              <Loaderring />
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Bookin;
