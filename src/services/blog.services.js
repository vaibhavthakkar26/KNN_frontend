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
};

export default BlogService;
