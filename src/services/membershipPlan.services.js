import axios from "axios";
import { api_url } from "../config";

const MembershipPlanService = {
  getMembershipPlan: async (token) => {
    try {
      const res = await axios.get(`${api_url}/subscriptions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response: ", res);
      return res;
    } catch (error) {
      // console.log("Error", error.response);
      return error.response;
    }
  },

  userBuySubscription: async (
    userId,
    subscriptionId,
    bookNames,
    authorNames,
    titleImages
  ) => {
    try {
      console.log("userId", titleImages[0]);
      const formData = new FormData();
      for (let i = 0; i < titleImages.length; i++) {
        formData.append(`titleImage`, titleImages[i]);
      }
      // formData.append("titleImage[0]", titleImages[0]);
      // formData.append("titleImage[1]", titleImages[1]);
      // formData.append("titleImage[2]", titleImages[2]);
      formData.append("bookName", bookNames[0]);
      formData.append("bookName", bookNames[1]);
      formData.append("bookName", bookNames[2]);
      formData.append("authorName", authorNames[0]);
      formData.append("authorName", authorNames[1]);
      formData.append("authorName", authorNames[2]);

      formData.append("userId", userId);
      formData.append("subscriptionId", subscriptionId);

      console.log("formData", formData);

      const res = await axios.post(`${api_url}/subscriptions/user`, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      return res;
    } catch (error) {
      // console.log("Error", error.response);
      return error.response;
    }
  },
};

export default MembershipPlanService;
