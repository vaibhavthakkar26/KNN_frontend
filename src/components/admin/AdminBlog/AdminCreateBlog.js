import React, { useState, useEffect } from "react";
import Adminsidebar from "../Adminsidebar";
import "../Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BlogService from "../../../services/blog.services";
import Loaderring from "../../../comman/Loader";
import SuccessToast from "../../../comman/SuccessToast";
import ErrorToast from "../../../comman/ErrorToast";
import queryString from "query-string";
function AdminCreateBlog(props) {
  const { id } = queryString.parse(props.location.search);
  const [blog, setBlog] = useState();
  const [title, settitle] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleImage, settitleImage] = useState("");
  const [blogWritter, setblogWritter] = useState("");

  const [isLoading, setisLoading] = useState(false);

  const [allBlogWriters, setAllBlogWriters] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      setisLoading(true);
      const getBlogWriters = await BlogService.getBlogWriters();
      setAllBlogWriters(getBlogWriters.data.data);
      setblogWritter(getBlogWriters.data.data[0].id);
      setisLoading(false);
      if (id !== null && id !== undefined) {
        setisLoading(true);
        const getblog = await BlogService.getBlog(id);
        console.log("getblog", getblog);
        await setBlog(getblog.data.data);
        settitle(getblog.data.data.title);
        setsubTitle(getblog.data.data.subTitle);
        setBody(getblog.data.data.body);
        // settitleImage(getblog.data.data.titleImage);
        setblogWritter(getblog.data.data.BlogWriter.id);
        setisLoading(false);
      }
    };
    doFetch();
  }, []);

  const createBlogHandler = async () => {
    if (id !== null && id !== undefined) {
      console.log(title);
      console.log(subTitle);
      console.log(body);
      console.log(titleImage);
      console.log(blogWritter);
      const updateBlog = await BlogService.updateBlog(
        id,
        title,
        subTitle,
        body,
        blogWritter,
        titleImage[0]
      );

      if (updateBlog.status === 200) {
        SuccessToast(updateBlog.data.message);
        props.history.push(`/adminbloglist`);
      } else {
        ErrorToast(updateBlog.data.message);
      }
    } else {
      console.log(title);
      console.log(subTitle);
      console.log(body);
      console.log(titleImage);
      console.log(blogWritter);
      const createBlog = await BlogService.createBlog(
        title,
        subTitle,
        body,
        blogWritter,
        titleImage[0]
      );

      if (createBlog.status === 200) {
        SuccessToast(createBlog.data.message);
        props.history.push(`/adminbloglist`);
      } else {
        ErrorToast(createBlog.data.message);
      }
    }
  };
  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="Admin_creata_book_main">
            <div class="comman_creat_blog_class">
              <div class="create_bookName">
                <div>
                  <label> Title </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="BookName"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>
              </div>
              <div class="create_bookName">
                <div>
                  <label> Subtitle </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="BookName"
                    value={subTitle}
                    onChange={(e) => setsubTitle(e.target.value)}
                  />
                </div>
              </div>
              <div class="create_bookName">
                <div>
                  <label> Body </label>
                </div>
                <CKEditor
                  editor={ClassicEditor}
                  data={body}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setBody(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </div>
            <div class="comman_creat_blog_class">
              <div class="create_bookName">
                <div>
                  <label> settitleImage </label>
                </div>
                <div>
                  <input
                    type="file"
                    placeholder="pages"
                    onChange={(e) => settitleImage(e.target.files)}
                  />
                </div>
              </div>
              <div class="create_bookName">
                <div>
                  <label> blogWritter </label>
                </div>
                <div>
                  <select onChange={(e) => setblogWritter(e.target.value)}>
                    {isLoading ? (
                      <div style={{ marginLeft: "123px" }}>
                        <Loaderring />
                      </div>
                    ) : (
                      allBlogWriters.map((writer) =>
                        blogWritter === writer.id ? (
                          <option value={writer.id} selected>
                            {" "}
                            {writer.name}
                          </option>
                        ) : (
                          <option value={writer.id}> {writer.name}</option>
                        )
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div class="create_book_btn_area">
              {id !== null && id !== undefined ? (
                <button
                  onClick={createBlogHandler}
                  style={{
                    background: "#00BD57",
                    color: "white",
                    width: "261px",
                    height: "41px",
                    border: "#00BD57",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Edit Blog
                </button>
              ) : (
                <button
                  onClick={createBlogHandler}
                  style={{
                    background: "#00BD57",
                    color: "white",
                    width: "261px",
                    height: "41px",
                    border: "#00BD57",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Create Blog
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateBlog;
