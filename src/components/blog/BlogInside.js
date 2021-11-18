import React, { useEffect, useState } from "react";
import "./BlogInside.css";
import queryString from "query-string";
import facebook from "../../assets/image/facebook 1.png";
import instagram from "../../assets/image/Glossy-Instagram-logo-PNG 1.png";
import youtube from "../../assets/image/youtube 1.png";
import linkedin from "../../assets/image/linkedin 1.png";
import twitter from "../../assets/image/twitter 1.png";
import elipse84 from "../../assets/image/Ellipse 84.png";
import elipse85 from "../../assets/image/Ellipse 85.png";
import Header from "../../components/navbar/navbar";
import elipse86 from "../../assets/image/Ellipse 86.png";
import star from "../../assets/image/Star 5.svg";
import Footer from "../../components/footer/Footer";
import BlogService from "../../services/blog.services";
import bookswithchild from "../../assets/image/kisspng-child-reading-book-vector-book-mountain-book-sea-5a9ea4f6f022e3 1.png";
import Loaderring from "../../comman/Loader";
import { useParams } from "react-router";

function BlogInside(props) {
  const [blog, setBlog] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [blogCreatedAt, setBlogCreatedAt] = useState();
  const { id } = queryString.parse(props.location.search);

  console.log("Id", id);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const getblog = await BlogService.getBlog(id);
      console.log("getblog", getblog);
      await setBlog(getblog.data.data);
      setBlogCreatedAt(
        new Date(getblog.data.data.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      setisLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
       <Header />
      {isLoading ? (
        <div style={{ marginLeft: "123px" }}>
          <Loaderring />
        </div>
      ) : (
        <div>
          {blog ? (
            <div>
              <div className="blog_main_image">
                <div>
                  <p> {blogCreatedAt} </p>
                </div>
                <div>
                  <h3> {blog.title} </h3>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
              {/* {blog.body} */}
              <div className="blog_inside_footer_blog">
                <div className="blog_blog_inside_blog">
                  <div className="blog_left_side_blog">
                    <img src={blog.BlogWriter.profilePicture} alt="" style={{borderRadius:"50%"}} width="237px" height="237px" />
                  </div>
                  <div className="blog_right_side_blog">
                    <div className="social_media_blog">
                      <div className="blog_owner_detailS">
                        <h2>  By {blog.BlogWriter.name}</h2>
                        <p> {blog.BlogWriter.designation} </p>
                      </div>
                      <div className="social_media_inside">
                        <img src={facebook} alt="" />
                        <img src={instagram} alt="" />
                        <img src={youtube} alt="" />
                        <img src={linkedin} alt="" />
                        <img src={twitter} alt="" />
                      </div>
                    </div>
                    <div className="details_about_blog_inside">
                      <p>{blog.BlogWriter.about}</p>
                    </div>
                    <hr/>
                    <div className="authour_area_blog_inside">
                      <h2>RATE THE AUTHOR </h2>
                      <div className="star_blog_inside">
                        <img src={star} className="star_svg_bi" alt="" />
                        <img src={star} className="star_svg_bi" alt="" />
                        <img src={star} className="star_svg_bi" alt="" />
                        <img src={star} className="star_svg_bi" alt="" />
                        <img src={star} className="star_svg_bi" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text_area_blog_inside">
                  <textarea
                    className="text_Text_area"
                    placeholder="Leave Your comment"
                  ></textarea>
                </div>

                <div className="comment_section_blog_inside">
                  <div className="comment_section_left_bi">
                    <h1> TOP Comments</h1>
                    <div className="comment_one_area">
                      <div>
                        <img src={elipse85} alt="" />
                      </div>
                      <div className="blog_inside_comment_comment">
                        <p>
                        Lorem ipsum dolor sit amet, adipiscing elit, sed do
                        eiusmod incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis Lorem ipsum dolor sit amet,
                        adipiscing elit, sed do eiusmod incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        </p>
                      </div>
                    </div>
                    
                    
                    {/* <p style={{color:"#fff",marginTop:"10px"}}> ..........................................................................................................................................................................</p> */}
                    <div className="comment_one_area">
                      <div>
                        <img src={elipse86} alt="" />
                      </div>
                      <div className="blog_inside_comment_comment">
                        <p>
                        Lorem ipsum dolor sit amet, adipiscing elit, sed do
                        eiusmod incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis Lorem ipsum dolor sit amet,
                        adipiscing elit, sed do eiusmod incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="comment_section_right_bi">
                    <h3> From the same Author</h3>
                    <img src={bookswithchild} alt="" />
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea.... Continue Reading
                    </p>
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

export default BlogInside;
