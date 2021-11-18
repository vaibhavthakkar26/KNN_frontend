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
};

export default CategoryService;
