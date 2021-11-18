import React, { useEffect, useState } from "react";
import "./Book.css";
import bestseller from "../../assets/image/bestseller 1.png";
import CategoryService from "../../services/category.service";
import Loaderring from "../../comman/Loader";
import queryString from "query-string";
import Header from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import BookServices from "../../services/book.services";
function Book(props) {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isBookLoading, setisBookLoading] = useState(false);

  let { catid } = queryString.parse(props.location.search);
  async function getBookByCategory(categoryId) {
    setisBookLoading(true);
    const allBooks = await BookServices.getBookByCategory(categoryId);
    console.log("Book by category", allBooks);
    setBooks(allBooks.data.data);
    setisBookLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      catid = catid === undefined ? 0 : catid;
      console.log("cat id", catid);
      setisLoading(true);
      const categoreyres = await CategoryService.getCategory("BOOK");
      console.log("Cat in Book Js", categoreyres);
      setCategories(categoreyres.data.data);
      setisLoading(false);
      getBookByCategory(catid);
    };
    fetchData();
  }, []);

  function onBookSelect(bookId) {
    props.history.push(`/bookin?bookId=${bookId}`);
  }

  // console.log("categories=>",categories);
  return (
    <div>
      <Header />
      <div style={{ display: "flex", marginTop: "63px" }}>
        {/* <!-- left --> */}
        <div class="main_left_side">
          <div class="left-book-main_area">
            <div class="books_categories_filter_area">
              <h2 class="filter_book_text"> Filter Options </h2>
              <div class="filter_categories">
                <h1 class="cat_book_cat"> Categories </h1>
                <hr style={{ border: "1px solid #FFFFFF" }} />
                <div class="categorey_book_main_book">
                  {isLoading ? (
                    <div style={{ marginLeft: "123px" }}>
                      <Loaderring />
                    </div>
                  ) : (
                    categories.map((catname) => (
                      <h3 onClick={() => getBookByCategory(catname.id)}>
                        {catname.categoryName}
                      </h3>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- image section --> */}
          <div>
            <img src={bestseller} alt="" class="best_seller_image" />
          </div>
        </div>
        {/* <!-- right --> */}
        <div class="right_main_side">
          {/* <!-- BOOK AREA RIGHT SIDE --> */}
          <div class="books_main_book_header">
            <h2> BOOKS</h2>
          </div>
          <div class="main_book_right">
            {/* <!-- book structure here --> */}

            {isBookLoading ? (
              <div style={{ marginLeft: "123px" }}>
                <Loaderring />
              </div>
            ) : (
              books.map((book) => (
                <div class="main_book_str">
                  <img
                    src={book.titleImage}
                    class="book_book"
                    alt="Book"
                    onClick={() => onBookSelect(book.id)}
                  />

                  <div class="book_rating_area">
                    <div class="star_book">
                      <svg
                        width="17"
                        height="16"
                        style={{
                          position: "relative",
                          left: "13px",
                          top: "10px",
                        }}
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.54894 0.927052C7.8483 0.0057416 9.1517 0.00573945 9.45106 0.92705L10.6329 4.56434C10.7668 4.97636 11.1507 5.25532 11.5839 5.25532H15.4084C16.3771 5.25532 16.7799 6.49494 15.9962 7.06434L12.9021 9.31231C12.5516 9.56695 12.405 10.0183 12.5389 10.4303L13.7207 14.0676C14.02 14.9889 12.9656 15.7551 12.1818 15.1857L9.08779 12.9377C8.7373 12.6831 8.2627 12.6831 7.91222 12.9377L4.81815 15.1857C4.03444 15.7551 2.97996 14.9889 3.27931 14.0676L4.46114 10.4303C4.59501 10.0183 4.44835 9.56695 4.09787 9.31231L1.00381 7.06434C0.220092 6.49494 0.622867 5.25532 1.59159 5.25532H5.41606C5.84929 5.25532 6.23324 4.97636 6.36712 4.56434L7.54894 0.927052Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div class="rating_number">
                      <h2> {book.avgRating === null ? 0.0 : book.avgRating}</h2>
                    </div>
                  </div>

                  <div class="book_information_book">
                    <h3> {book.categoryName} </h3>
                    <p> {book.bookName}</p>
                    <button class="price_book_main"> Rs.{book.price}</button>
                  </div>
                </div>
              ))
            )}

            {/* <!--  --> */}

            {/* <!--  --> */}

            {/* <!--  --> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Book;
