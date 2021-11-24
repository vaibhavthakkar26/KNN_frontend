import React, { useEffect, useState } from "react";
import BookService from "../../../services/book.services";
import Adminsidebar from "../Adminsidebar";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Loaderring from "../../../comman/Loader";
import ErrorToast from "../../../comman/ErrorToast";
import SuccessToast from "../../../comman/SuccessToast";
import { Link } from "react-router-dom";

function AdminBookList(props) {
  const [books, setBooks] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getAllBooks = async () => {
    setisLoading(true);
    const getBooks = await BookService.getBooks();
    await setBooks(getBooks.data.data);

    setisLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllBooks();
      $(document).ready(function () {
        $("#example").DataTable();
      });
    };
    fetchData();
  }, []);

  const onBookClick = async (bookId) => {
    console.log("bookId: ", bookId);
    props.history.push(`/adminBookDetails?id=${bookId}`);
  };

  const onStatusChange = async (id, changeTo) => {
    setisLoading(true);
    setBooks([]);
    console.log("onStatusChange", id, changeTo);
    const statusChange = await BookService.bookStatusChange(id, changeTo);

    if (statusChange.status === 200) {
      SuccessToast(statusChange.data.message);
      // await getAllBooks();
      window.location.reload();
    } else {
      ErrorToast(statusChange.data.message);
      // await getAllBooks();
      window.location.reload();
    }
  };

  const onBookEdit = async (bookId) => {
    console.log("bookId: ", bookId);
    props.history.push(`/admincreatebook?id=${bookId}`);
  };

  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="event_btn_admin">
            <h3>Books</h3>
            <Link to="/admincreatebook">
              <button> Create Book </button>
            </Link>
          </div>
          <table id="example" class="cell-border stripe">
            <thead>
              <tr>
                <th>No</th>
                <th>BookName</th>
                <th>ISBN</th>
                <th>Stock</th>
                <th>IsActivated</th>
                <th>AuthorName</th>
                <th>CreatedBy</th>
                <th>Edit </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div style={{ marginLeft: "123px" }}>
                  <Loaderring />
                </div>
              ) : (
                books.map((res, i) => {
                  return (
                    <tr class="table-success">
                      <td>{i + 1}</td>
                      <td onClick={() => onBookClick(res.id)}>
                        {res.bookName}
                      </td>
                      <td>{res.isbn}</td>
                      <td>{res.stock}</td>
                      <td>
                        {res.isActivated ? (
                          <label class="switch">
                            <input
                              type="checkbox"
                              onChange={() => onStatusChange(res.id, false)}
                              checked
                            />
                            <span class="slider round"></span>
                          </label>
                        ) : (
                          <label class="switch">
                            <input
                              type="checkbox"
                              onChange={() => onStatusChange(res.id, true)}
                            />
                            <span class="slider round"></span>
                          </label>
                        )}
                      </td>
                      <td>{res.authorName}</td>
                      <td>{res.createdBy}</td>
                      <td>
                        <button onClick={() => onBookEdit(res.id)}>Edit</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminBookList;
