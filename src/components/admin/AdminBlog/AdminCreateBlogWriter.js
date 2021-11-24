import React, { useState } from "react";
import Adminsidebar from "../Adminsidebar";
import BlogService from "../../../services/blog.services";
import Loaderring from "../../../comman/Loader";
import SuccessToast from "../../../comman/SuccessToast";
import ErrorToast from "../../../comman/ErrorToast";
import queryString from "query-string";
function AdminCreateBlogWriter(props) {
  const [name, setname] = useState("");
  const [profilePicture, setprofilePicture] = useState("");
  const [emailId, setemailId] = useState("");
  const [desgination, setdesgination] = useState("");
  const [about, setabout] = useState("");
  const [fbLink, setfbLink] = useState("");
  const [instagramLink, setinstagramLink] = useState("");
  const [youtubeLink, setyoutubeLink] = useState("");

  const createBlogwritterHandler = async () => {
    console.log(name);
    console.log(profilePicture);
    console.log(emailId);
    console.log(desgination);
    console.log(about);
    console.log(fbLink);
    console.log(instagramLink);
    console.log(youtubeLink);
    const createBlogWriter = await BlogService.createBlogWriter(
      name,
      profilePicture[0],
      emailId,
      desgination,
      about,
      fbLink,
      instagramLink,
      youtubeLink
    );
    if (createBlogWriter.status === 200) {
      SuccessToast(createBlogWriter.data.message);
      // props.history.push(`/adminbloglist`);
    } else {
      ErrorToast(createBlogWriter.data.message);
    }
  };
  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="Admin_create_blog_writer_main">
            <div class="comaan_create_blogwritter_section">
              <div class="create_blogwritter_section_area">
                <div>
                  <label> Name </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
              </div>
              <div class="create_blogwritter_section_area">
                <div>
                  <label> ProfilePicture </label>
                </div>
                <div>
                  <input
                    type="file"
                    placeholder="ProfilePicture"
                    onChange={(e) => setprofilePicture(e.target.files)}
                  />
                </div>
              </div>
            </div>

            <div class="comaan_create_blogwritter_section">
              <div class="create_blogwritter_section_area">
                <div>
                  <label> Email Id </label>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Id"
                    onChange={(e) => setemailId(e.target.value)}
                  />
                </div>
              </div>
              <div class="create_blogwritter_section_area">
                <div>
                  <label> Designation </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Designation"
                    onChange={(e) => setdesgination(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div class="comaan_create_blogwritter_section">
              <div class="create_blogwritter_section_area">
                <div>
                  <label> About </label>
                </div>
                <div>
                  <textarea
                    placeholder="About"
                    onChange={(e) => setabout(e.target.value)}
                  />
                </div>
              </div>
              <div class="create_blogwritter_section_area">
                <div>
                  <label> Facebook Link </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Facebook Link"
                    onChange={(e) => setfbLink(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div class="comaan_create_blogwritter_section">
              <div class="create_blogwritter_section_area">
                <div>
                  <label> Instagram Link </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="instagram link"
                    onChange={(e) => setinstagramLink(e.target.value)}
                  />
                </div>
              </div>
              <div class="create_blogwritter_section_area">
                <div>
                  <label> YoutubeLink </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="youtube Link"
                    onChange={(e) => setyoutubeLink(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div class="create_blog_writter_btn">
              <button
                onClick={createBlogwritterHandler}
                class="btn_btn_create_blogwitter"
              >
                {" "}
                Create{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateBlogWriter;
