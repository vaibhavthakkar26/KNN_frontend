import React from "react";
import { useEffect, useState } from "react";
import ErrorToast from "../../../comman/ErrorToast";
import Loaderring from "../../../comman/Loader";
import SuccessToast from "../../../comman/SuccessToast";
import CategoryService from "../../../services/category.service";
import CommanService from "../../../services/comman.service";
import DiscussionService from "../../../services/discussion.services";
import Adminsidebar from "../Adminsidebar";
import queryString from "query-string";
function Admin_createDiscuss(props) {
  const { id } = queryString.parse(props.location.search);
  const [categoryId, setCategoryId] = useState("");
  const [topic, settopic] = useState("");
  const [details, setdetails] = useState("");
  const [titleimage, settitleimage] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const categoreyres = await CategoryService.getCategory("DISCUSSION");
      console.log("Cat in Create disc Js", categoreyres);
      setCategories(categoreyres.data.data);
      setCategoryId(categoreyres.data.data[0].id);
      setisLoading(false);
      if (id !== null && id !== undefined) {
        setisLoading(true);
        const discus = await DiscussionService.getDiscussion(id);
        settopic(discus.data.data.question);
        setdetails(discus.data.data.description);
        // settitleimage(discus.data.data.titleImage);
        setCategoryId(discus.data.data.categoryId);
        setisLoading(false);
      }
    };
    fetchData();
  }, []);

  const createHandele = async () => {
    if (id !== null && id !== undefined) {
      console.log("title", topic);
      console.log("subTitle", details);
      console.log("description", titleimage);
      console.log("categoryId", categoryId);
      const token = localStorage.getItem("accessToken");
      if (token === null || token === undefined) {
        props.history.push(`/login`);
        ErrorToast("Please do login");
      } else {
        const decodetoken = await CommanService.decodeJWTToken(token);
        if (decodetoken.Role !== "Platform Admin") {
          props.history.push(`/`);
        }

        const updatediscussion = await DiscussionService.updateDiscussion(
          id,
          titleimage[0],
          topic,
          decodetoken.id,
          categoryId,
          details
        );

        if (updatediscussion.status === 200) {
          SuccessToast(updatediscussion.data.message);
        } else {
          ErrorToast(updatediscussion.data.message);
        }
      }
    } else {
      console.log("title", topic);
      console.log("subTitle", details);
      console.log("description", titleimage);
      console.log("categoryId", categoryId);
      const token = localStorage.getItem("accessToken");
      if (token === null || token === undefined) {
        props.history.push(`/login`);
        ErrorToast("Please do login");
      } else {
        const decodetoken = await CommanService.decodeJWTToken(token);
        if (decodetoken.Role !== "Platform Admin") {
          props.history.push(`/`);
        }

        const discussion = await DiscussionService.createDiscussion(
          titleimage[0],
          topic,
          decodetoken.id,
          categoryId,
          details
        );

        if (discussion.status === 200) {
          SuccessToast(discussion.data.message);
        } else {
          ErrorToast(discussion.data.message);
        }
      }
    }
  };
  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="main_div_discuss_admin">
            <div class="topic">
              <label> Select Category </label>
              <br />
              <select onChange={(e) => setCategoryId(e.target.value)}>
                {isLoading ? (
                  <div style={{ marginLeft: "123px" }}>
                    <Loaderring />
                  </div>
                ) : (
                  categories.map((catname) =>
                    categoryId === catname.id ? (
                      <option value={catname.id} selected>
                        {" "}
                        {catname.categoryName}
                      </option>
                    ) : (
                      <option value={catname.id}>
                        {" "}
                        {catname.categoryName}
                      </option>
                    )
                  )
                )}
              </select>
            </div>
            <div class="topic">
              <label>Topic</label>
              <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) => settopic(e.target.value)}
              />
            </div>
            <div class="details">
              <label>Details</label>
              <input
                type="text"
                placeholder="Details"
                value={details}
                onChange={(e) => setdetails(e.target.value)}
              />
            </div>
            <div class="title_image">
              <label>Title Image</label>
              <input
                type="file"
                placeholder="Title Image"
                onChange={(e) => settitleimage(e.target.files)}
              />
            </div>

            <div class="btn_create_discussion">
              {id !== null && id !== undefined ? (
                <button onClick={createHandele}>Update Discussion</button>
              ) : (
                <button onClick={createHandele}>Create Discussion</button>
              )}
            </div>
            {/* <div class="btn_add_components">
              <button>Add Components</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_createDiscuss;
