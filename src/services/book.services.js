import axios from "axios";
import { api_url } from "../config";

const BookServices = {
  getBookByCategory: async (categoryId) => {
    try {
      const res = await axios.get(`${api_url}/books/category/${categoryId}`);
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getBooks: async () => {
    try {
      const res = await axios.get(`${api_url}/books`);
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  bookStatusChange: async (bookId, changeTo) => {
    try {
      const res = await axios.put(
        `${api_url}/books/${bookId}/status?status=${changeTo}`
      );
      console.log("bookStatusChange Response: ", res);
      return res;
    } catch (error) {
      console.log("bookStatusChange Error", error.response);
      return error.response;
    }
  },

  getBookById: async (bookId) => {
    try {
      const res = await axios.get(`${api_url}/books/${bookId}`);
      console.log("Response", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getTreandingThisWeek: async () => {
    try {
      const res = await axios.get(`${api_url}/books/trading`);
      console.log("Response", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getMostLovedBooks: async () => {
    try {
      const res = await axios.get(`${api_url}/books/most/loved`);
      console.log("Response", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getBookAuthors: async () => {
    try {
      const res = await axios.get(`${api_url}/books/author`);
      console.log("getBookAuthors Response", res);
      return res;
    } catch (error) {
      console.log("getBookAuthors Error", error.response);
      return error.response;
    }
  },

  createBook: async (
    name,
    isbn,
    pages,
    description,
    price,
    titleImage,
    createdBy,
    authorId,
    verifyBy
  ) => {
    try {
      const res = await axios.post(`${api_url}/books`, {
        bookName: name,
        isbn: isbn,
        pages: pages,
        description: description,
        price: price,
        titleImage: titleImage,
        createdBy: createdBy,
        authorId: authorId,
        verifyBy: verifyBy,
      });
      console.log("createBook Response", res);
      return res;
    } catch (error) {
      console.log("createBook Error", error.response);
      return error.response;
    }
  },
};

export default BookServices;
