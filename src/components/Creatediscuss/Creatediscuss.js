import React, { useEffect, useState } from "react";
import "./Creatediscuss.css";
import Header from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import CategoryService from "../../services/category.service";
import Loaderring from "../../comman/Loader";
import CommanService from "../../services/comman.service";
import ErrorToast from "../../comman/ErrorToast";
import SuccessToast from "../../comman/SuccessToast";
import DiscussionService from "../../services/discussion.services";
import { toast } from "react-toastify";
toast.configure();
function Cretediscuss(props) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [titleImage, setTitleImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const categoreyres = await CategoryService.getCategory("DISCUSSION");
      console.log("Cat in Create disc Js", categoreyres);
      setCategories(categoreyres.data.data);
      setCategoryId(categoreyres.data.data[0].id);
      setisLoading(false);
    };
    fetchData();
  }, []);

  async function onCreate() {
    console.log(categoryId, titleImage[0], title, description);
    const token = localStorage.getItem("accessToken");
    if (token === null || token === undefined) {
      props.history.push(`/login`);
      ErrorToast("Please do login");
    } else {
      const decodetoken = await CommanService.decodeJWTToken(token);

      const discussion = await DiscussionService.createDiscussion(
        titleImage[0],
        title,
        decodetoken.id,
        categoryId,
        description
      );

      if (discussion.status === 200) {
        SuccessToast(discussion.data.message);
      } else {
        ErrorToast(discussion.data.message);
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="create_disussion_main">
        {/* <!-- left side --> */}
        <div className="left_create_disucssion">
          <div className="create_disucssion_head">
            <p> Create Disussion</p>
            <hr
              style={{
                border: "1px solid rgba(255, 193, 6, 1)",
                marginBottom: "20px",
              }}
            />
          </div>

          <div className="cate_drop_down">
            <label> Select Category </label>
            <br />
            <select
              className="category_book_topic"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {isLoading ? (
                <div style={{ marginLeft: "123px" }}>
                  <Loaderring />
                </div>
              ) : (
                categories.map((catname) => (
                  <option value={catname.id}> {catname.categoryName}</option>
                ))
              )}
            </select>
          </div>

          <input
            type="file"
            onChange={(e) => setTitleImage(e.target.files)}
            required
          />

          <div className="topic_area_cd">
            <p> Topic</p>
            <textarea
              placeholder="topic you want to discuss"
              className="text_area_cd"
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>

          <div className="Details_create_disussion">
            <p>Details</p>
            <textarea
              className="details_cd_area"
              placeholder="Details of your discussion"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="create_disussion_create_disussion">
            <button className="create_dis_btn" onClick={() => onCreate()}>
              Create Discussionn{" "}
            </button>
          </div>
        </div>
        <div className="right_side_cd">
          <h2> category </h2>
          <hr />
          {/* categorey list will be in h3  */}
          <div className="create_discuss_cat_list">
            <h3> list one </h3>
            <h3> list two </h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cretediscuss;
