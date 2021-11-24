import React, { useEffect, useState } from "react";
import "./Memberwithbook.css";
import MembershipService from "../../services/membershipPlan.services";
import ErrorToastMember from "../../comman/ErrorToast";
import Loaderring from "../../comman/Loader";
import queryString from "query-string";
import CommanService from "../../services/comman.service";
import Header from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();

function Memberwithbook(props) {
  const { id } = queryString.parse(props.location.search);
  const [isLoading, setisLoading] = useState(false);

  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [titleImage, setTitleImage] = useState("");

  const [bookName1, setBookName1] = useState("");
  const [authorName1, setAuthorName1] = useState("");
  const [titleImage1, setTitleImage1] = useState("");

  const [bookName2, setBookName2] = useState("");
  const [authorName2, setAuthorName2] = useState("");
  const [titleImage2, setTitleImage2] = useState("");

  const [userid, setUserid] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const decodetoken = await CommanService.decodeJWTToken(token);
      if (
        decodetoken.Role === "User" &&
        decodetoken.subscriptionDone === true &&
        decodetoken.verify === false
      ) {
        props.history.push(`/`);
      } else if (
        decodetoken.Role === "Member" &&
        decodetoken.subscriptionDone === true &&
        decodetoken.verify === true
      ) {
        props.history.push(`/`);
      }

      setUserid(decodetoken.id);
    };
    fetchData();
  }, []);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        // console.log("baseURL", baseURL);
        resolve(baseURL);
      };
    });
  };

  const onComplete = async () => {
    setisLoading(true);
    const titleImages = [];
    const bookNames = [];
    const authorNames = [];
    const userId = userid;
    const subscriptionId = id;

    // await getBase64(titleImage[0]).then((result) => {
    titleImages.push(titleImage[0]);
    // });
    // await getBase64(titleImage1[0]).then((result) => {
    titleImages.push(titleImage1[0]);
    // });
    // await getBase64(titleImage2[0]).then((result) => {
    titleImages.push(titleImage2[0]);
    // });

    bookNames.push(bookName, bookName1, bookName2);
    authorNames.push(authorName, authorName1, authorName2);
    console.log("bookNames", bookNames);
    console.log("authorNames", authorNames);
    console.log("titleImages", titleImages);

    const buySubcription = await MembershipService.userBuySubscription(
      userId,
      subscriptionId,
      bookNames,
      authorNames,
      titleImages
    );
    console.log("buySubcription", buySubcription);
    if (buySubcription.status === 400) {
      console.log("in error", buySubcription.data.message);
      ErrorToastMember(buySubcription.data.message);
      setisLoading(false);
    } else if (buySubcription.status === 200) {
      setisLoading(false);
      localStorage.setItem("accessToken", buySubcription.data.data.accessToken);
      localStorage.setItem(
        "refreshToken",
        buySubcription.data.data.refreshToken
      );
      props.history.push(`/`);
    }
  };
  return (
    <div>
      <Header />
      <div className="container_with_book">
        <div className="video_box_book"></div>
        <div className="with_book_sec_heading">
          <h2> with Books 123 </h2>
          <p>
            {" "}
            **Please upload any 3 books as deposit & pay Rs. 200 in order to
            become a member of KNN Community.
          </p>
        </div>

        <div className="Main_upload_section">
          <div className="first_upload_one">
            <div className="book_title_section">
              <input
                type="text"
                placeholder="Book Name *"
                onChange={(e) => setBookName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="AuthorName *"
                onChange={(e) => setAuthorName(e.target.value)}
                required
              />
            </div>
            <div className="upload_book_area">
              <input
                type="file"
                onChange={(e) => setTitleImage(e.target.files)}
                required
              />
            </div>
          </div>
          <div className="first_upload_two">
            <div className="book_title_section">
              <input
                type="text"
                placeholder="Book Name *"
                onChange={(e) => setBookName1(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="AuthorName *"
                onChange={(e) => setAuthorName1(e.target.value)}
                required
              />
            </div>
            <div className="upload_book_area">
              <input
                type="file"
                onChange={(e) => setTitleImage1(e.target.files)}
                required
              />
            </div>
          </div>
          <div className="first_upload_three">
            <div className="book_title_section">
              <input
                type="text"
                placeholder="Book Name *"
                onChange={(e) => setBookName2(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="AuthorName *"
                onChange={(e) => setAuthorName2(e.target.value)}
                required
              />
            </div>
            <div className="upload_book_area">
              <input
                type="file"
                onChange={(e) => setTitleImage2(e.target.files)}
                required
              />
            </div>
          </div>
        </div>

        {/* <input
          type="text"
          placeholder="Book Name"
          onChange={(e) => setBookName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author Name"
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <input
          type="file"
          placeholder="Book Title Image"
          onChange={(e) => setTitleImage(e.target.files)}
          required
        /> */}
        {/* <br />

        <input
          type="text"
          placeholder="Book Name"
          onChange={(e) => setBookName1(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author Name"
          onChange={(e) => setAuthorName1(e.target.value)}
          required
        />
        <input
          type="file"
          placeholder="Book Title Image"
          onChange={(e) => setTitleImage1(e.target.files)}
          required
        />
        <br />

        <input
          type="text"
          placeholder="Book Name"
          onChange={(e) => setBookName2(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author Name"
          onChange={(e) => setAuthorName2(e.target.value)}
          required
        />
        <input
          type="file"
          placeholder="Book Title Image"
          onChange={(e) => setTitleImage2(e.target.files)}
          required
        />
        <br /> */}

        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <Loaderring />
          </div>
        ) : (
          <button className="Login_button" onClick={onComplete}>
            {" "}
            Sign in{" "}
          </button>
        )}
        <div className="payment_section_with_books">
          <h2>
            {" "}
            For payment, send <span className="area_200"> Nrs.200</span> to esewa or
            Khalti
          </h2>
        </div>
        <div className="transfer_id_paid_event">
          <h2>
            {" "}
            esewa/Khalti ID:<b> 9861446103</b>
          </h2>
        </div>
        <div className="agree_">
          <input type="checkbox" />
          <label>
            I agree to the Privacy Policy and Terms & Conditions of the
            organization.
          </label>
          <div className="last_section_memberwith">
            <button className="complete_btn_member"> complete</button>
            <h2>
              {" "}
              Does not have books ?{" "}
              <span className="keep_deposit_member"> Keep Deposit </span>{" "}
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Memberwithbook;
