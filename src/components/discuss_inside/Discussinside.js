import React, { useEffect, useState } from "react";
import "../discuss_inside/Discussinside.css";
import Header from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import Ellipse from "../../assets/image/Ellipse 75.png";
import Ellipse78 from "../../assets/image/Ellipse 78.png";
import DiscussionService from "../../services/discussion.services";
import Loaderring from "../../comman/Loader";
import queryString from "query-string";
import CommanService from "../../services/comman.service";
import ErrorToast from "../../comman/ErrorToast";
import SuccessToast from "../../comman/SuccessToast";
function Discussinside(props) {
  const [allDiscussion, setAllDiscussion] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [comment, setComment] = useState("");

  const { discussId } = queryString.parse(props.location.search);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const discussion = await DiscussionService.getDiscussion(discussId);
      console.log(discussion, "discussion");
      await setAllDiscussion(discussion.data.data);
      setisLoading(false);
    };
    fetchData();
  }, []);

  async function onPost() {
    const token = localStorage.getItem("accessToken");
    if (token === null || token === undefined) {
      props.history.push(`/login`);
      ErrorToast("Please do login");
    } else {
      const decodetoken = await CommanService.decodeJWTToken(token);

      const answer = await DiscussionService.createAnswer(
        discussId,
        decodetoken.id,
        comment
      );
      if (answer.status === 200) {
        SuccessToast("Comment Added");
        setisLoading(true);
        const discussion = await DiscussionService.getDiscussion(discussId);
        console.log(discussion, "discussion");
        await setAllDiscussion(discussion.data.data);
        setisLoading(false);
      } else {
        ErrorToast(answer.data.message);
      }
    }
  }
  return (
    <div>
      <Header />
      <div className="main_discuss_form_inside_">
        {isLoading ? (
          <div style={{ marginLeft: "123px" }}>
            <Loaderring />
          </div>
        ) : (
          <div>
            {allDiscussion ? (
              <div className="left_D_F_I">
                <div className="create_discuss_section_inside">
                  <h2> Loerm Ipsum </h2>
                  <input type="search" placeholder="Type of search " />
                  <button className="create_discuss_btn_btn">
                    {" "}
                    Create Discussion
                  </button>
                </div>
                <hr style={{ border: "1px solid rgba(255, 193, 6, 1)" }} />
                <div className="one_one_heading">
                  <h2> {allDiscussion.question} </h2>
                  <div className="comment_section_discuss_inside">
                    <div className="p_p_discuss_inside">
                      <img src={allDiscussion.User.profilePicture} alt="" />
                    </div>
                    <div className="comment_main_discuss">
                      <div className="edit_section_d_f_I">
                        <div className="comment_timing_discussion">
                          <h2>{allDiscussion.User.firstName}</h2>
                          <h3>4 Hrs Ago</h3>
                        </div>
                        <div className="edit_main_discussion">
                          <h2>Edit </h2>
                        </div>
                      </div>
                      <div className="_d_f_i_comment">
                        <h2>{allDiscussion.description}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="user_comment_section_">
                    <div className="user_p_p_area">
                      <img src={Ellipse} alt="" />
                    </div>
                    <div className="user_comment_section_di">
                      <textarea
                        placeholder="your comments......"
                        className="comment_user_texT_areA"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <br />
                      <button className="post_comment" onClick={() => onPost()}>
                        Post Commnet
                      </button>
                    </div>
                  </div>
                  <svg
                    width="117"
                    height="130"
                    viewBox="0 0 117 130"
                    fill="none"
                    className="tri_angle_discuss_inside"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M117 64.9446L-6.36219e-06 129.849L-4.56785e-07 0.040675L117 64.9446Z"
                      fill="#0055B3"
                      fill-opacity="0.28"
                    />
                  </svg>

                  {allDiscussion.DiscussionAnswer.length > 0 ? (
                    allDiscussion.DiscussionAnswer.map((ans) => (
                      <div className="users_comment_sec_d_f_i">
                        <div className="main_u_c_d_f_i">
                          <img src={ans.User.profilePicture} alt="" />
                        </div>
                        <div className="comment_name_area">
                          <div className="user_name_dfi_area">
                            <h1>{ans.User.firstName} </h1>
                            <p>{ans.answer}</p>
                          </div>
                          <div className="edit_delete_section_d_inside">
                            <p> Edit </p>
                            <p> Delete </p>
                            <p> 3 Likes</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1>No Comments</h1>
                  )}

                  <svg
                    width="111"
                    height="111"
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
              </div>
            ) : (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            )}
          </div>
        )}

        <div className="right_D_F_I">
          {/* <!-- dynamic part start from h1 --> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Discussinside;
