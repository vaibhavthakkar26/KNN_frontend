import React, { useState, useEffect } from "react";
import ErrorToast from "../../../comman/ErrorToast";
import Loaderring from "../../../comman/Loader";
import SuccessToast from "../../../comman/SuccessToast";
import BookServices from "../../../services/book.services";
import CommanService from "../../../services/comman.service";
import Adminsidebar from "../Adminsidebar";
function AdminCreateBook(props) {
  const [BookName, setBookName] = useState();
  const [ISBN, setISBN] = useState("");
  const [page, setpage] = useState("");
  const [Description, setDescription] = useState("");
  const [price, setprice] = useState("");
  const [TitleImage, setTitleImage] = useState("");
  const [stock, setstock] = useState("");
  const [Author, setAuthor] = useState("");
  const [allAuthor, setAllAuthor] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      setisLoading(true);
      const getBookAuthors = await BookServices.getBookAuthors();
      setAllAuthor(getBookAuthors.data.data);
      setAuthor(getBookAuthors.data.data[0].id);
      setisLoading(false);
    };
    doFetch();
  }, []);

  const createBookHandler = async () => {
    console.log(BookName);
    console.log(ISBN);
    console.log(page);
    console.log(Description);
    console.log(price);
    console.log(TitleImage);
    // console.log(stock);
    console.log(Author);
    const token = localStorage.getItem("accessToken");
    if (token === null || token === undefined) {
      props.history.push(`/`);
    } else {
      const decodetoken = await CommanService.decodeJWTToken(token);
      if (decodetoken.Role !== "Platform Admin") {
        props.history.push(`/`);
      } else {
        const createBook = await BookServices.createBook(
          BookName,
          ISBN,
          page,
          Description,
          price,
          TitleImage,
          decodetoken.id,
          Author,
          decodetoken.id
        );

        if (createBook.status === 200) {
          SuccessToast(createBook.data.message);
          // props.history.push(
          //   `/admineventdetails?id=${createBook.data.data.id}`
          // );
        } else {
          ErrorToast(createBook.data.message);
        }
      }
    }
  };

  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="Admin_creata_book_main">
            <div class="comman_creat_book_class">
              <div class="create_bookName">
                <div>
                  <label> BookName </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="BookName"
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </div>
              </div>
              <div class="create_bookName">
                <div>
                  <label> ISBN </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="BookName"
                    onChange={(e) => setISBN(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class="comman_creat_book_class">
              <div class="create_bookName">
                <div>
                  <label> page </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="pages"
                    onChange={(e) => setpage(e.target.value)}
                  />
                </div>
              </div>
              <div class="create_bookName">
                <div>
                  <label> Description </label>
                </div>
                <div>
                  <textarea
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class="comman_creat_book_class">
              <div class="create_bookName">
                <div>
                  <label> price </label>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="price"
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
              </div>
              <div class="create_bookName">
                <div>
                  <label> TitleImage </label>
                </div>
                <div>
                  <input
                    type="file"
                    placeholder="Title image"
                    onChange={(e) => setTitleImage(e.target.files)}
                  />
                </div>
              </div>
            </div>

            <div class="comman_creat_book_class">
              {/* <div class="create_bookName">
                <div>
                  <label> stock </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="stock"
                    onChange={(e) => setstock(e.target.value)}
                  />
                </div>
              </div> */}
              <div class="Author_area_create_book">
                <div>
                  <label> Author </label>
                </div>
                <div>
                  <select onChange={(e) => setAuthor(e.target.value)}>
                    {isLoading ? (
                      <div style={{ marginLeft: "123px" }}>
                        <Loaderring />
                      </div>
                    ) : (
                      allAuthor.map((author) => (
                        <option value={author.id}> {author.name}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div class="create_book_btn_area">
              <button
                onClick={createBookHandler}
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
                createbook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateBook;
