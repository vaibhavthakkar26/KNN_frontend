import React, { useEffect, useState } from "react";
import "./blog.css";
import Header from "../../components/navbar/navbar";
import blog_image from "../../assets/image/onlinedigitalmarketingstory 1.png";
import Loaderring from "../../comman/Loader";
import BlogService from "../../services/blog.services";
import Footer from "../../components/footer/Footer";
function Blog(props) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const getblog = await BlogService.getAllBlog();
      console.log("getblog", getblog);
      setBlogs(getblog.data.data);
      setisLoading(false);
    };
    fetchData();
  }, []);

  const onBlogClick = async (blogId) => {
    console.log("BlogId: ", blogId);
    props.history.push(`/bloginside?id=${blogId}`);
  };
  return (
    <div>
      <Header />
      <div className="main_blog_area">
        {isLoading ? (
          <div style={{ marginLeft: "123px" }}>
            <Loaderring />
          </div>
        ) : (
          blogs.map((blog) => (
            // <div className="main_blog_area">
            <div className="blog_section">
              <div className="blog_main_image1">
                <img
                  src={blog.titleImage}
                  className="blog__child_image_area"
                  alt=""
                  onClick={() => onBlogClick(blog.id)}
                />
                <div className="blog_in_blog">
                  <h2> {blog.title}</h2>
                  <p> {blog.subTitle}</p>
                </div>
              </div>
            </div>
            // </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Blog;
