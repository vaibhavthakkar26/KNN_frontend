import React, { useEffect, useState } from "react";
import "./disccuss.css";
import Header from "../../components/navbar/navbar";
import rectangle69 from "../../assets/image/Rectangle 69.png";
import Footer from "../../components/footer/Footer";
import rectangle75 from "../../assets/image/Ellipse 75.png";
import { Link } from "react-router-dom";
import queryString from "query-string";
import CategoryService from "../../services/category.service";
import Loaderring from "../../comman/Loader";
import CommanService from "../../services/comman.service";
import ErrorToast from "../../comman/ErrorToast";
import SuccessToast from "../../comman/SuccessToast";
import { toast } from "react-toastify";
import DiscussionService from "../../services/discussion.services";
toast.configure();
function Discuss(props) {
  const [categories, setCategories] = useState([]);
  const [allDiscussion, setAllDiscussion] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isDiscussionLoading, setisDiscussionLoading] = useState(false);

  let { catid } = queryString.parse(props.location.search);

  async function onCategorySelect(catId) {
    setisDiscussionLoading(true);
    const discussion = await DiscussionService.getAllDiscussion(catId);
    console.log("All Discussion", discussion);
    await setAllDiscussion(discussion.data.data);
    await setisDiscussionLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      catid = catid === undefined ? null : catid;
      setisLoading(true);
      const categoreyres = await CategoryService.getCategory("DISCUSSION");
      console.log("Cat in Create disc Js", categoreyres);
      setCategories(categoreyres.data.data);
      setisLoading(false);
      await onCategorySelect(catid);
    };
    fetchData();
  }, []);

  async function selectDiscussion(id) {
    props.history.push(`/discussinside?discussId=${id}`);
  }

  return (
    <div>
      <Header />
      {/* <!-- LEFT SIDE PART STATRT FROM HERE --> */}
      <div style={{ display: "flex" }}>
        <div className="cate_gories">
          <div className="discussion_categories_main">
            <h2 className="categories_disscussion_larea"> Categories </h2>
            <hr style={{ border: "1px solid #D1D1D1" }} />
            {isLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              categories.map((catname) => (
                <h2 onClick={() => onCategorySelect(catname.id)}>
                  {catname.categoryName}
                </h2>
              ))
            )}
            {/* <h1> ALL Discussions </h1>
            <h1> Banking </h1>
            <h1> Litrature </h1> */}
          </div>
        </div>

        <div>
          {/* <!-- right side top search and button part start --> */}
          <div className="main_all_discussion">
            <div className="discussion_search_area">
              <h2> All Discussion </h2>
              <div className="search_area_discussion">
                <input
                  type="search"
                  placeholder="Type to search"
                  className="discussion_search"
                />
                {/* <!--  for cvg position: relative; left: -31px; top: 5px; --> */}
              </div>

              <Link to="/creatediscuss">
                {" "}
                <button className="ask_que"> create discussion </button>
              </Link>
            </div>
            <hr style={{ border: "1px solid #FFC106" }} />
            <div className="category_of_discussion">
              <div>
                <p> {allDiscussion.length} question </p>
              </div>
              <div className="discussion_button">
                <button className="discuss_button_1"> Newst </button>
                <button className="discuss_button_2"> Most Popular </button>
                <button className="discuss_button_3"> Not Answered </button>
              </div>
            </div>
          </div>
          {/* <!-- end  right side top search and button part -->
        <!-- start discussion_part --> */}
          {isDiscussionLoading ? (
            <div style={{ marginLeft: "123px" }}>
              <Loaderring />
            </div>
          ) : (
            allDiscussion.map((discussion) => (
              <div className="discussion_area_main">
                <div className="discuss_part_">
                  <img
                    src={discussion.titleImage}
                    alt=""
                    className="discuss_image"
                    onClick={() => selectDiscussion(discussion.id)}
                  />
                </div>
                <div className="discussion_text_area">
                  <div className="first_section_discuss_area">
                    <div className="discuss_profile_area">
                      <img src={discussion.User.profilePicture} alt="" />
                    </div>
                    <div className="discuss_creater_details">
                      <p>{discussion.User.firstName}</p>
                      <div className="svg_and_names">
                        <div className="disucss_svg_part">
                          {/* <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.29135 1.04467C5.52444 0.372146 6.47556 0.372147 6.70865 1.04468L7.6213 3.67798C7.72594 3.9799 8.0104 4.18237 8.32994 4.18237H11.1751C11.9133 4.18237 12.2074 5.13667 11.5973 5.55224L9.38057 7.06213C9.10059 7.25283 8.9832 7.60753 9.09414 7.9276L9.96018 10.4264C10.1967 11.109 9.42637 11.6986 8.82932 11.2919L6.42221 9.65233C6.16748 9.47882 5.83252 9.47882 5.57779 9.65233L3.17068 11.2919C2.57363 11.6986 1.80326 11.109 2.03982 10.4264L2.90586 7.9276C3.0168 7.60752 2.89941 7.25283 2.61943 7.06213L0.402708 5.55224C-0.207413 5.13667 0.0867133 4.18237 0.82492 4.18237H3.67006C3.9896 4.18237 4.27406 3.9799 4.3787 3.67798L5.29135 1.04467Z"
                              fill="#0055B3"
                            />
                          </svg>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.29135 1.04467C5.52444 0.372146 6.47556 0.372147 6.70865 1.04468L7.6213 3.67798C7.72594 3.9799 8.0104 4.18237 8.32994 4.18237H11.1751C11.9133 4.18237 12.2074 5.13667 11.5973 5.55224L9.38057 7.06213C9.10059 7.25283 8.9832 7.60753 9.09414 7.9276L9.96018 10.4264C10.1967 11.109 9.42637 11.6986 8.82932 11.2919L6.42221 9.65233C6.16748 9.47882 5.83252 9.47882 5.57779 9.65233L3.17068 11.2919C2.57363 11.6986 1.80326 11.109 2.03982 10.4264L2.90586 7.9276C3.0168 7.60752 2.89941 7.25283 2.61943 7.06213L0.402708 5.55224C-0.207413 5.13667 0.0867133 4.18237 0.82492 4.18237H3.67006C3.9896 4.18237 4.27406 3.9799 4.3787 3.67798L5.29135 1.04467Z"
                              fill="#0055B3"
                            />
                          </svg>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.29135 1.04467C5.52444 0.372146 6.47556 0.372147 6.70865 1.04468L7.6213 3.67798C7.72594 3.9799 8.0104 4.18237 8.32994 4.18237H11.1751C11.9133 4.18237 12.2074 5.13667 11.5973 5.55224L9.38057 7.06213C9.10059 7.25283 8.9832 7.60753 9.09414 7.9276L9.96018 10.4264C10.1967 11.109 9.42637 11.6986 8.82932 11.2919L6.42221 9.65233C6.16748 9.47882 5.83252 9.47882 5.57779 9.65233L3.17068 11.2919C2.57363 11.6986 1.80326 11.109 2.03982 10.4264L2.90586 7.9276C3.0168 7.60752 2.89941 7.25283 2.61943 7.06213L0.402708 5.55224C-0.207413 5.13667 0.0867133 4.18237 0.82492 4.18237H3.67006C3.9896 4.18237 4.27406 3.9799 4.3787 3.67798L5.29135 1.04467Z"
                              fill="#0055B3"
                            />
                          </svg>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.29135 1.04467C5.52444 0.372146 6.47556 0.372147 6.70865 1.04468L7.6213 3.67798C7.72594 3.9799 8.0104 4.18237 8.32994 4.18237H11.1751C11.9133 4.18237 12.2074 5.13667 11.5973 5.55224L9.38057 7.06213C9.10059 7.25283 8.9832 7.60753 9.09414 7.9276L9.96018 10.4264C10.1967 11.109 9.42637 11.6986 8.82932 11.2919L6.42221 9.65233C6.16748 9.47882 5.83252 9.47882 5.57779 9.65233L3.17068 11.2919C2.57363 11.6986 1.80326 11.109 2.03982 10.4264L2.90586 7.9276C3.0168 7.60752 2.89941 7.25283 2.61943 7.06213L0.402708 5.55224C-0.207413 5.13667 0.0867133 4.18237 0.82492 4.18237H3.67006C3.9896 4.18237 4.27406 3.9799 4.3787 3.67798L5.29135 1.04467Z"
                              fill="#0055B3"
                            />
                          </svg>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.29135 1.04467C5.52444 0.372146 6.47556 0.372147 6.70865 1.04468L7.6213 3.67798C7.72594 3.9799 8.0104 4.18237 8.32994 4.18237H11.1751C11.9133 4.18237 12.2074 5.13667 11.5973 5.55224L9.38057 7.06213C9.10059 7.25283 8.9832 7.60753 9.09414 7.9276L9.96018 10.4264C10.1967 11.109 9.42637 11.6986 8.82932 11.2919L6.42221 9.65233C6.16748 9.47882 5.83252 9.47882 5.57779 9.65233L3.17068 11.2919C2.57363 11.6986 1.80326 11.109 2.03982 10.4264L2.90586 7.9276C3.0168 7.60752 2.89941 7.25283 2.61943 7.06213L0.402708 5.55224C-0.207413 5.13667 0.0867133 4.18237 0.82492 4.18237H3.67006C3.9896 4.18237 4.27406 3.9799 4.3787 3.67798L5.29135 1.04467Z"
                              fill="#0055B3"
                            />
                          </svg> */}
                          <p>{discussion.User.address}</p>
                        </div>
                        {/* <!-- <div className="name_dicussion">
                                
                            </div>  --> */}
                      </div>
                    </div>
                  </div>
                  <div className="text_area_heading">
                    <h3>{discussion.question}</h3>
                    <p>{discussion.description}</p>
                  </div>

                  <div className="like_comment_discussion_area">
                    <div className="unlike_like_area">
                      <div className="like_area_discussion">
                        <p> 1258 </p>
                      </div>
                      <div className="unlike">
                        {/* <!-- svg here  --> */}
                        <p> 3 </p>
                      </div>
                    </div>

                    <div className="comment_views_area">
                      <div className="replies_area">
                        <p> 200 replies</p>
                      </div>
                      <div className="discussion_viewer_area">
                        <p> 2136 views</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Discuss;
