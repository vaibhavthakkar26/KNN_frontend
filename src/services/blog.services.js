import axios from "axios";
import { api_url } from "../config";

const BlogService = {
  getAllBlog: async () => {
    try {
      const res = await axios.get(`${api_url}/blogs`);
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getBlog: async (blogId) => {
    try {
      const res = await axios.get(`${api_url}/blogs/${blogId}`);
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  deleteBlog: async (blogId) => {
    try {
      const res = await axios.delete(`${api_url}/blogs/${blogId}`);
      console.log("deleteBlog Response: ", res);
      return res;
    } catch (error) {
      console.log("deleteBlog Error", error.response);
      return error.response;
    }
  },

  getBlogWriters: async () => {
    try {
      const res = await axios.get(`${api_url}/blogs/writer`);
      console.log("getBlogWriters Response: ", res);
      return res;
    } catch (error) {
      console.log("getBlogWriters Error", error.response);
      return error.response;
    }
  },

  createBlog: async (title, subTitle, body, blogWriter, titleImage) => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("titleImage", titleImage);
      formData.append("subTitle", subTitle);
      formData.append("body", body);
      formData.append("blogWriter", blogWriter);
      const res = await axios.post(`${api_url}/blogs`, formData);
      console.log("createBlog Response: ", res);
      return res;
    } catch (error) {
      console.log("createBlog Error", error.response);
      return error.response;
    }
  },

  updateBlog: async (blogId, title, subTitle, body, blogWriter, titleImage) => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("titleImage", titleImage);
      formData.append("subTitle", subTitle);
      formData.append("body", body);
      formData.append("blogWriter", blogWriter);
      const res = await axios.put(`${api_url}/blogs/${blogId}`, formData);
      console.log("createBlog Response: ", res);
      return res;
    } catch (error) {
      console.log("createBlog Error", error.response);
      return error.response;
    }
  },

  createBlogWriter: async (
    name,
    profilePicture,
    emailId,
    designation,
    about,
    fbLink,
    instaLink,
    ytLink
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("profilePicture", profilePicture);
      formData.append("emailId", emailId);
      formData.append("designation", designation);
      formData.append("about", about);
      formData.append("fbLink", fbLink);
      formData.append("instaLink", instaLink);
      formData.append("ytLink", ytLink);
      const res = await axios.post(`${api_url}/blogs/writer`, formData);
      console.log("createBlogWriter Response: ", res);
      return res;
    } catch (error) {
      console.log("createBlogWriter Error", error.response);
      return error.response;
    }
  },

  deleteBlogWriter: async (id) => {
    try {
      const res = await axios.delete(`${api_url}/blogs/writer/${id}`);
      console.log("deleteBlogWriter Response: ", res);
      return res;
    } catch (error) {
      console.log("deleteBlogWriter Error", error.response);
      return error.response;
    }
  },
};

export default BlogService;
