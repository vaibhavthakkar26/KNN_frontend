import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./homeslider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tbook1 from "../../assets/image/Tbook1.png";
import BookServices from "../../services/book.services";
import Loaderring from "../../comman/Loader";
function Homeslider(props) {
  const [mostLoved, setMostLoved] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const most = await BookServices.getMostLovedBooks();
      setMostLoved(most.data.data);
      setisLoading(false);
    };
    fetchData();
  }, []);

  async function onBookSelect(bookId) {
    props.history.push(`/bookin?bookId=${bookId}`);
  }

  return (
    <div>
      <div class="style_home_slider">
        <Slider {...settings}>
          {isLoading ? (
            <div style={{ marginLeft: "123px" }}>
              <Loaderring />
            </div>
          ) : (
            mostLoved.map((book) => (
              <div className="home_slider_main">
                <div className="Slider_image_area">
                  <img
                    src={book.titleImage}
                    alt=""
                    onClick={() => onBookSelect(book.id)}
                  />
                </div>
                <div className="book_description12">
                  <div className="image_slider_description">
                    <h3 className="adventure_button"> {book.categoryName}</h3>
                    <div className="star_rate">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.05284 1.41289C5.35219 0.49158 6.6556 0.49158 6.95495 1.41289L7.65316 3.56175C7.78703 3.97378 8.17099 4.25274 8.60421 4.25274H10.8637C11.8324 4.25274 12.2352 5.49235 11.4514 6.06175L9.62351 7.38983C9.27303 7.64447 9.12637 8.09584 9.26024 8.50786L9.95845 10.6567C10.2578 11.578 9.20332 12.3442 8.41961 11.7748L6.59168 10.4467C6.24119 10.192 5.76659 10.192 5.41611 10.4467L3.58817 11.7748C2.80446 12.3442 1.74998 11.578 2.04933 10.6567L2.74754 8.50786C2.88141 8.09584 2.73476 7.64447 2.38427 7.38983L0.556337 6.06175C-0.227377 5.49235 0.175398 4.25274 1.14412 4.25274H3.40357C3.8368 4.25274 4.22075 3.97378 4.35463 3.56175L5.05284 1.41289Z"
                          fill="#0055B3"
                        />
                      </svg>
                      <p> {book.avgRating}</p>
                    </div>
                  </div>
                  <div className="details_book_price">
                    <h1 onClick={() => onBookSelect(book.id)}>
                      {book.bookName}{" "}
                    </h1>
                    <p> {book.authorName}</p>
                    <button className="slider_buyer_btn">
                      {" "}
                      Rs.{book.price}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>

    // <div>
    // <Slider {...settings}>
    //   <div>
    //         <div className="home_slider_main">
    //             <div className="Slider_image_area">
    //                 <img src={Tbook1} alt=""/>
    //             </div>
    //             <div className="book_description12">
    //             <div className="image_slider_description">
    //             <h3 className="adventure_button">  Adventure</h3>
    //             <div className="star_rate">
    //                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M5.05284 1.41289C5.35219 0.49158 6.6556 0.49158 6.95495 1.41289L7.65316 3.56175C7.78703 3.97378 8.17099 4.25274 8.60421 4.25274H10.8637C11.8324 4.25274 12.2352 5.49235 11.4514 6.06175L9.62351 7.38983C9.27303 7.64447 9.12637 8.09584 9.26024 8.50786L9.95845 10.6567C10.2578 11.578 9.20332 12.3442 8.41961 11.7748L6.59168 10.4467C6.24119 10.192 5.76659 10.192 5.41611 10.4467L3.58817 11.7748C2.80446 12.3442 1.74998 11.578 2.04933 10.6567L2.74754 8.50786C2.88141 8.09584 2.73476 7.64447 2.38427 7.38983L0.556337 6.06175C-0.227377 5.49235 0.175398 4.25274 1.14412 4.25274H3.40357C3.8368 4.25274 4.22075 3.97378 4.35463 3.56175L5.05284 1.41289Z" fill="#0055B3"/>
    //                 </svg>
    //                 <p> 4.5</p>
    //             </div>
    //             </div>
    //             <div className="details_book_price">
    //                 <h1> Kon tiki </h1>
    //                 <p> Thor Heyerdahi</p>
    //             <button className="slider_buyer_btn"> Rs.25</button>
    //         </div>
    //         </div>
    //         </div>
    //   </div>
    //   <div>

    //   <div className="home_slider_main">
    //     <div className="Slider_image_area">
    //         <img src={Tbook1} alt=""/>
    //     </div>
    //     <div className="book_description12">
    //     <div className="image_slider_description">
    //     <h3 className="adventure_button">  Adventure</h3>
    //     <div className="star_rate">
    //         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M5.05284 1.41289C5.35219 0.49158 6.6556 0.49158 6.95495 1.41289L7.65316 3.56175C7.78703 3.97378 8.17099 4.25274 8.60421 4.25274H10.8637C11.8324 4.25274 12.2352 5.49235 11.4514 6.06175L9.62351 7.38983C9.27303 7.64447 9.12637 8.09584 9.26024 8.50786L9.95845 10.6567C10.2578 11.578 9.20332 12.3442 8.41961 11.7748L6.59168 10.4467C6.24119 10.192 5.76659 10.192 5.41611 10.4467L3.58817 11.7748C2.80446 12.3442 1.74998 11.578 2.04933 10.6567L2.74754 8.50786C2.88141 8.09584 2.73476 7.64447 2.38427 7.38983L0.556337 6.06175C-0.227377 5.49235 0.175398 4.25274 1.14412 4.25274H3.40357C3.8368 4.25274 4.22075 3.97378 4.35463 3.56175L5.05284 1.41289Z" fill="#0055B3"/>
    //         </svg>
    //         <p > 4.5</p>
    //     </div>
    //     </div>
    //       <div className="details_book_price">
    //         <h1> Kon tiki </h1>
    //         <p> Thor Heyerdahi</p>
    //         <button className="slider_buyer_btn"> Rs.25</button>
    //       </div>
    //     </div>
    // </div>

    //   </div>
    //   <div>
    //   <div className="home_slider_main">
    //     <div className="Slider_image_area">
    //         <img src={Tbook1} alt=""/>
    //     </div>
    //     <div className="book_description12">
    //     <div className="image_slider_description">
    //     <h3 className="adventure_button">  Adventure</h3>
    //     <div className="star_rate">
    //         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M5.05284 1.41289C5.35219 0.49158 6.6556 0.49158 6.95495 1.41289L7.65316 3.56175C7.78703 3.97378 8.17099 4.25274 8.60421 4.25274H10.8637C11.8324 4.25274 12.2352 5.49235 11.4514 6.06175L9.62351 7.38983C9.27303 7.64447 9.12637 8.09584 9.26024 8.50786L9.95845 10.6567C10.2578 11.578 9.20332 12.3442 8.41961 11.7748L6.59168 10.4467C6.24119 10.192 5.76659 10.192 5.41611 10.4467L3.58817 11.7748C2.80446 12.3442 1.74998 11.578 2.04933 10.6567L2.74754 8.50786C2.88141 8.09584 2.73476 7.64447 2.38427 7.38983L0.556337 6.06175C-0.227377 5.49235 0.175398 4.25274 1.14412 4.25274H3.40357C3.8368 4.25274 4.22075 3.97378 4.35463 3.56175L5.05284 1.41289Z" fill="#0055B3"/>
    //         </svg>
    //         <p > 4.5</p>
    //     </div>
    //     </div>
    //       <div className="details_book_price">
    //         <h1> Kon tiki </h1>
    //         <p> Thor Heyerdahi</p>
    //         <button className="slider_buyer_btn"> Rs.25</button>
    //       </div>
    //     </div>
    // </div>
    //   </div>

    //   <div>
    //   <div className="home_slider_main">
    //     <div className="Slider_image_area">
    //         <img src={Tbook1} alt=""/>
    //     </div>
    //     <div className="book_description12">
    //     <div className="image_slider_description">
    //     <h3 className="adventure_button">  Adventure</h3>
    //     <div className="star_rate">
    //         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M5.05284 1.41289C5.35219 0.49158 6.6556 0.49158 6.95495 1.41289L7.65316 3.56175C7.78703 3.97378 8.17099 4.25274 8.60421 4.25274H10.8637C11.8324 4.25274 12.2352 5.49235 11.4514 6.06175L9.62351 7.38983C9.27303 7.64447 9.12637 8.09584 9.26024 8.50786L9.95845 10.6567C10.2578 11.578 9.20332 12.3442 8.41961 11.7748L6.59168 10.4467C6.24119 10.192 5.76659 10.192 5.41611 10.4467L3.58817 11.7748C2.80446 12.3442 1.74998 11.578 2.04933 10.6567L2.74754 8.50786C2.88141 8.09584 2.73476 7.64447 2.38427 7.38983L0.556337 6.06175C-0.227377 5.49235 0.175398 4.25274 1.14412 4.25274H3.40357C3.8368 4.25274 4.22075 3.97378 4.35463 3.56175L5.05284 1.41289Z" fill="#0055B3"/>
    //         </svg>
    //         <p > 4.5</p>
    //     </div>
    //     </div>
    //       <div className="details_book_price">
    //         <h1> Kon tiki </h1>
    //         <p> Thor Heyerdahi</p>
    //         <button className="slider_buyer_btn"> Rs.25</button>
    //       </div>
    //     </div>
    // </div>
    //   </div>
    //   {/* <div>
    //     <h3>4</h3>
    //   </div>
    //   <div>
    //     <h3>5</h3>
    //   </div>
    //   <div>
    //     <h3>6</h3>
    //   </div>
    //   <div>
    //     <h3>7</h3>
    //   </div>
    //   <div>
    //     <h3>8</h3>
    //   </div>
    //   <div>
    //     <h3>9</h3>
    //   </div> */}
    // </Slider>
    // </div>
  );
}
export default Homeslider;
