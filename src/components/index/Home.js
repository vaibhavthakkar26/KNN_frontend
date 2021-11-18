import React, { useEffect, useState } from "react";
import book3 from "../../assets/image/bookpng3 1.png";
import book2 from "../../assets/image/bookpng2 1.png";
import Header from "../../components/navbar/navbar";
import book1 from "../../assets/image/bookpng1 1.png";
import Tbook1 from "../../assets/image/Tbook1.png";
import TBOOK2 from "../../assets/image/TBOOK2.png";
import Slider from "react-slick";
import tbook3 from "../../assets/image/tbook3.png";
import Specialevent from "../../comman/Specialevent";
import tbook4 from "../../assets/image/tbook4 (1).png";
import GD1 from "../../assets/image/onlinegraphicdesignclassesknn 1.png";
import Dm1 from "../../assets/image/onlinedigitalmarketingclassknn 1.png";
import Ellipse from "../../assets/image/Ellipse 72.png";
import Homeslider from "../stylecomponents/Homeslider";
import Rectangle50 from "../../assets/image/Rectangle 50.png";
import GD2 from "../../assets/image/onlinegraphicdesignclassesknn 2.png";
import dm2 from "../../assets/image/onlinedigitalmarketingclassknn 2.png";
import "./home.css";
import searchIcon from "../../assets/image/search 1.svg";
import fastdeivery from "../../assets/image/fast-delivery (1) 1.svg";
import organicproduct from "../../assets/image/organic-product 1.svg";
import intellectual from "../../assets/image/intellectual (1) 1.svg";
import callsvg from "../../assets/image/call (1) 1.svg";
import CommanService from "../../services/comman.service";
import BookService from "../../services/book.services";
import navbar from "../navbar/navbar";
import Footer from "../../components/footer/Footer";
import CategoryService from "../../services/category.service";
import Loaderring from "../../comman/Loader";
import BookServices from "../../services/book.services";
import BlogService from "../../services/blog.services";

function Home(props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  const [userName, setUserName] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [treadingThisWeek, setTreadingThisWeek] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token === null || token === undefined) {
        setIsLogin(false);
      } else {
        const decodetoken = await CommanService.decodeJWTToken(token);
        if (decodetoken.Role === "Platform Admin") {
          props.history.push(`/admindashboard`);
        }
        setUserName(decodetoken.firstName);
        setIsLogin(true);
      }
      setisLoading(true);
      const categoreyres = await CategoryService.getCategory("BOOK");
      console.log("Cat in Book Js", categoreyres);
      setCategories(categoreyres.data.data);
      const treding = await BookService.getTreandingThisWeek();
      setTreadingThisWeek(treding.data.data);
      const getblog = await BlogService.getAllBlog();
      console.log("getblog", getblog);
      const threeBlog = [];
      if (getblog.data.data.length > 3) {
        for (let i = 0; i < 3; i++) {
          threeBlog.push(getblog.data.data[i]);
        }
      } else {
        for (let i = 0; i < getblog.data.data.length; i++) {
          threeBlog.push(getblog.data.data[i]);
        }
      }
      setBlogs(threeBlog);

      setisLoading(false);
    };
    fetchData();
  }, []);

  async function selectCategory(categoryId) {
    props.history.push(`/book?catid=${categoryId}`);
  }

  async function onSelectBook(bookId) {
    props.history.push(`/bookin?bookId=${bookId}`);
  }

  const onBlogClick = async (blogId) => {
    console.log("BlogId: ", blogId);
    props.history.push(`/bloginside?id=${blogId}`);
  };

  return (
    <div>
      <Header />
      <div class="home_firstsection">
        <div class="home_section_child1">
          <div class="home_sec_one">
            <h4> MOST POPULAR NEPALI NOVELS </h4> <br />
            <h3> SALES UP TO 30% OFF </h3>
            <button class="shop_BTN_BTN"> SHOP NOW </button>
          </div>
          <div>
            <div class="Novels_part">
              <div class="First_novel">
                <img src={book3} alt="" />
              </div>
              <div class="second_part">
                <img src={book2} alt="" />
              </div>
              <div class="third_part">
                <img src={book1} alt="" />
              </div>

              {/* <!-- novel image section --> */}
            </div>
          </div>
        </div>
        <div class="home_section_child2">
          <div class="search">
            <input type="search" placeholder="what do you want to search" />
            <div class="search_icon">
              <img src={searchIcon} alt="" width="22px" height="22px" />
            </div>
          </div>
        </div>
      </div>
      <div class="Trending_heading">
        {" "}
        <h4> Trending This Week </h4>
        <svg
          width="392"
          height="629"
          viewBox="0 0 392 629"
          fill="none"
          style={{
            position: "absolute",
            top: "1100",
            zIndex: "-5",
            left: "-100px",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            r="302"
            transform="matrix(-1 0 0 1 77.5 314.5)"
            stroke="#FFC106"
            stroke-opacity="0.25"
            stroke-width="25"
          />
        </svg>
      </div>
      <div class="trending_week">
        {isLoading ? (
          <div style={{ marginLeft: "123px" }}>
            <Loaderring />
          </div>
        ) : (
          treadingThisWeek.map((book) => (
            <div class="book_one">
              <img
                src={book.titleImage}
                alt="book"
                onClick={() => onSelectBook(book.id)}
              />
              <div class="details_bookone">
                <h2> {book.categoryName}</h2>
                <p onClick={() => onSelectBook(book.id)}> {book.bookName} </p>
                <button class="tranding_bookbtn"> RS.{book.price}</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* <!-- carousel part  -->

    <!-- section three  --> */}
      <div class="home_sectionthree">
        <div class="section_three">
          <div class="quick_delivery">
            <img src={fastdeivery} alt="" width="93px" height="93px" />
            <div class="delivery_discussion">
              <h2> quick Delivery </h2>
              <p>
                {" "}
                Delivery within{" "}
                <span style={{ fontWeight: "bold" }}> 3 days </span>{" "}
              </p>
            </div>
          </div>
          <div class="eco_friendly">
            <img
              src={organicproduct}
              alt=""
              width="85px"
              height="85px"
              style={{ marginTop: "57px" }}
            />
            <div class="eco_friendly_discussion">
              <h2> ECO Friendly </h2>
              <p> Reuse Recycle </p>
            </div>
          </div>
          <div class="community">
            <img
              src={intellectual}
              alt=""
              width="89px"
              height="89px"
              style={{ marginTop: "57px" }}
            />
            <h2> Intellectual Community </h2>
            <p> connect with the community</p>
          </div>
          <div class="section_three_contact">
            <img
              src={callsvg}
              alt=""
              width="67px"
              height="67px"
              style={{ marginTop: "74px" }}
            />
            <h2> contacts </h2>
            <p>
              {" "}
              call us @ <span style={{ fontWeight: "bold" }}>
                9861446103
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div class="home_slider">
        <h2> Most Loved </h2>
        <Homeslider />
      </div>

      <div>
        <div class="categories_list_main">
          <h2> Categories</h2>

          <Slider {...settings}>
            {isLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              categories.map((catname) => (
                // <h3 onClick={() => getBookByCategory(catname.id)}>
                //   {catname.categoryName}
                // </h3>
                <div
                  class="book_list_box"
                  onClick={() => selectCategory(catname.id)}
                >
                  <p> {catname.categoryName} </p>
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>

      <Specialevent />
      {/* <div class="event_section">
        <div class="event_discuss_part">
            <div class="Speacial_event">
                <h1> SPECIAL EVENTS</h1>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
                <button class="rt_btn"> REGISTER TODAY</button>
            </div>
            
            <img src={GD1}  class="online_dm" alt=""/>
            <img src={Dm1} class="online_dm" alt=""/>
            
            <div>

            </div>
        </div>
    </div> */}

      {/* <!-- blog event  --> */}

      <div class="section_blog">
        <h2> Latest Blogs </h2>
        <div style={{ display: "flex", marginTop: "51px" }}>
          {isLoading ? (
            <div style={{ marginLeft: "123px" }}>
              <Loaderring />
            </div>
          ) : (
            blogs.map((blog) => (
              <div class="latest_blog_one">
                <div class="image_blog_section">
                  <img
                    src={blog.titleImage}
                    alt=""
                    onClick={() => onBlogClick(blog.id)}
                  />
                </div>
                <div>
                  <div class="discuss_blog">
                    <p> {blog.subTitle}</p>
                  </div>
                  <div class="blog_lastsection_">
                    <img
                      src={blog.BlogWriter.profilePicture}
                      alt=""
                      width="49px"
                      height="49px"
                      style={{ borderRadius: "50%" }}
                    />
                    <div class="details_date">
                      <h2>{blog.BlogWriter.name}</h2>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <svg
        width="392"
        height="629"
        viewBox="0 0 392 629"
        fill="none"
        style={{ position: "absolute", top: "3281px", zIndex: "-1" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          r="302"
          transform="matrix(-1 0 0 1 77.5 314.5)"
          stroke="#FFC106"
          stroke-opacity="0.25"
          stroke-width="25"
        />
      </svg>

      <div class="adv_main">
        <div class="adv_header">
          <h2> ADVERTISEMENTS</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button class="adv_btn">ADVERTISE HERE ! </button>
        </div>
        <img class="adv_img_1" src={GD2} height="336px" width="336px" alt="" />
        <img class="adv_img_2" src={dm2} height="336px" width="336px" alt="" />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
