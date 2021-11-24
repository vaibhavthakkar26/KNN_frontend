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
      console.log("getBookById Response", res);
      return res;
    } catch (error) {
      console.log("getBookById Error", error.response);
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
      const formData = new FormData();
      formData.append("bookName", name);
      formData.append("isbn", isbn);
      formData.append("pages", pages);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("titleImage", titleImage);
      formData.append("createdBy", createdBy);
      formData.append("authorId", authorId);
      formData.append("verifyBy", verifyBy);

      const res = await axios.post(`${api_url}/books`, formData);
      console.log("createBook Response", res);
      return res;
    } catch (error) {
      console.log("createBook Error", error.response);
      return error.response;
    }
  },

  updateBook: async (
    id,
    name,
    isbn,
    pages,
    description,
    price,
    titleImage,
    createdBy,
    authorId,
    verifyBy,
    stock
  ) => {
    try {
      const formData = new FormData();
      formData.append("bookName", name);
      formData.append("isbn", isbn);
      formData.append("pages", pages);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("titleImage", titleImage);
      formData.append("createdBy", createdBy);
      formData.append("authorId", authorId);
      formData.append("verifyBy", verifyBy);
      formData.append("stock", stock);
      const res = await axios.put(`${api_url}/books/${id}`, formData);
      console.log("updateBook Response", res);
      return res;
    } catch (error) {
      console.log("updateBook Error", error.response);
      return error.response;
    }
  },

  createBookCategory: async (bookId, catId) => {
    try {
      const res = await axios.post(
        `${api_url}/books/${bookId}/category/${catId}`
      );
      console.log("createBookCategory Response: ", res);
      return res;
    } catch (error) {
      console.log("createBookCategory Error", error.response);
      return error.response;
    }
  },

  deleteBookCategory: async (id) => {
    try {
      const res = await axios.delete(`${api_url}/books/category/${id}`);
      console.log("deleteBookCategory Response: ", res);
      return res;
    } catch (error) {
      console.log("deleteBookCategory Error", error.response);
      return error.response;
    }
  },
};

export default BookServices;
