import axios from "axios";
import { api_url } from "../config";

const CategoryService = {
  getCategory: async (categoryType) => {
    try {
      const res = await axios.get(
        `${api_url}/categories?categoryType=${categoryType}`
      );
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  createCategory: async (name, type, createdBy) => {
    try {
      const res = await axios.post(`${api_url}/categories`, {
        name: name,
        type: type,
        createdBy: createdBy,
      });
      console.log("createCategoryResponse: ", res);
      return res;
    } catch (error) {
      console.log("createCategoryError", error.response);
      return error.response;
    }
  },

  deleteCategory: async (id) => {
    try {
      const res = await axios.delete(`${api_url}/categories/${id}`);
      console.log("deleteCategory Response: ", res);
      return res;
    } catch (error) {
      console.log("deleteCategory Error", error.response);
      return error.response;
    }
  },
};

export default CategoryService;
