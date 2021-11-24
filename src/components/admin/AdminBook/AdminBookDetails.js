import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Adminsidebar from "../Adminsidebar";
import BookServices from "../../../services/book.services";
import Loaderring from "../../../comman/Loader";
import deletesvg from "../../../assets/image/delete.svg";
import CategoryService from "../../../services/category.service";
import SuccessToast from "../../../comman/SuccessToast";
import ErrorToast from "../../../comman/ErrorToast";

function AdminBookDetails(props) {
  const { id } = queryString.parse(props.location.search);
  const [book, setBook] = useState("");
  const [isBookLoading, setIsBookLoading] = useState(false);
  const [bookCategory, setBookCategory] = useState([]);
  const getBookById = async () => {
    setIsBookLoading(true);
    const books = await BookServices.getBookById(id);
    console.log("books");
    await setBook(books.data.data);
    const bookCat = await CategoryService.getCategory("BOOK");
    setBookCategory(bookCat.data.data);
    setIsBookLoading(false);
  };
  useEffect(() => {
    const doFetch = async () => {
      await getBookById();
    };
    doFetch();
  }, []);

  const addBookCategory = async (categoryId) => {
    console.log("categoryId", categoryId);
    if (categoryId !== 0) {
      const data = await BookServices.createBookCategory(id, categoryId);
      if (data.status === 200) {
        SuccessToast(data.data.message);
      } else {
        ErrorToast(data.data.message);
      }
      await getBookById();
    }
  };

  const deleteBookCategory = async (dataId) => {
    console.log("dataId", dataId);
    const data = await BookServices.deleteBookCategory(dataId);
    if (data.status === 200) {
      SuccessToast(data.data.message);
    } else {
      ErrorToast(data.data.message);
    }
    await getBookById();
  };
  return (
    <div>
      <div class="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="event_btn_admin">
            <h3>Book Details</h3>
          </div>
          {isBookLoading ? (
            <div style={{ marginLeft: "123px" }}>
              <Loaderring />
            </div>
          ) : (
            <div class="admin_event_">
              <div class="Details_event_main_admin">
                <div class="Image_area_event_admin">
                  <img
                    src={book.titleImage}
                    alt=""
                    width="200"
                    height="200"
                    style={{ marginTop: "50px" }}
                  />
                </div>
                <div class="main_details_area_admin">
                  <div class="details_one_">
                    <h2>Book Name</h2>
                    <p> {book.bookName}</p>
                  </div>
                  <div class="details_one_">
                    <h2> ISBN</h2>
                    <p> {book.isbn} </p>
                  </div>
                  <div class="details_one_">
                    <h2>Pages </h2>
                    <p> {book.pages}</p>
                  </div>
                  <div class="details_one_">
                    <h2> Description</h2>
                    <p>{book.description} </p>
                  </div>
                  <div class="details_one_">
                    <h2> Price</h2>
                    <p>{book.price} </p>
                  </div>
                  <div class="details_one_">
                    <h2>Stock</h2>
                    <p>{book.stock}</p>
                  </div>
                  <div class="details_one_">
                    <h2> Average Rating</h2>
                    <p> {book.avgRating === null ? "0.0" : book.avgRating}</p>
                  </div>
                  <div class="details_one_">
                    <h2> Author</h2>
                    <p>{book.BookAuthor ? book.BookAuthor.name : ""}</p>
                  </div>

                  <div class="details_one_">
                    <h2> Categories</h2>
                    <div>
                      <select onChange={(e) => addBookCategory(e.target.value)}>
                        <option value="0">--Select--</option>
                        {isBookLoading ? (
                          <div style={{ marginLeft: "123px" }}>
                            <Loaderring />
                          </div>
                        ) : (
                          bookCategory.map((cat) => (
                            <option value={cat.id}> {cat.categoryName}</option>
                          ))
                        )}
                      </select>
                    </div>
                    <div class="Admin_btn_benfits">
                      {book.BookCategory ? (
                        book.BookCategory.map((bookCat, i) => (
                          <div>
                            <div>
                              <li> {bookCat.Category.categoryName} </li>
                              <img
                                src={deletesvg}
                                width="30"
                                height="30"
                                alt=""
                                onClick={() => deleteBookCategory(bookCat.id)}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ marginLeft: "123px" }}>
                          <Loaderring />
                        </div>
                      )}
                    </div>

                    <br />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminBookDetails;
