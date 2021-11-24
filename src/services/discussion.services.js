import axios from "axios";
import { api_url } from "../config";

const DiscussionService = {
  createDiscussion: async (
    titleImage,
    question,
    createdBy,
    categoryId,
    description
  ) => {
    try {
      const formData = new FormData();
      formData.append("titleImage", titleImage);
      formData.append("question", question);
      formData.append("createdBy", createdBy);
      formData.append("categoryId", categoryId);
      formData.append("description", description);
      const res = await axios.post(`${api_url}/discussions`, formData);
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  updateDiscussion: async (
    id,
    titleImage,
    question,
    createdBy,
    categoryId,
    description
  ) => {
    try {
      const formData = new FormData();
      formData.append("titleImage", titleImage);
      formData.append("question", question);
      formData.append("createdBy", createdBy);
      formData.append("categoryId", categoryId);
      formData.append("description", description);
      const res = await axios.put(`${api_url}/discussions/${id}`, formData);
      console.log("updateDiscussion Response: ", res);
      return res;
    } catch (error) {
      console.log("updateDiscussion Error", error.response);
      return error.response;
    }
  },

  getAllDiscussion: async (categoryId) => {
    try {
      const res = await axios.get(
        `${api_url}/discussions?categoryId=${categoryId}`
      );
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getDiscussion: async (id) => {
    try {
      console.log("in dis");
      const res = await axios.get(`${api_url}/discussions/${id}`);
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  createAnswer: async (discussionId, answeredBy, answer) => {
    try {
      console.log("in dis");
      const res = await axios.post(`${api_url}/discussions/answer`, {
        discussionId: discussionId,
        answeredBy: answeredBy,
        answer: answer,
      });
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },
};

export default DiscussionService;
