import axios from "axios";
import { api_url } from "../config";

const AuthServices = {
  doLogin: async (loginId, password) => {
    try {
      const res = await axios.post(api_url + "/auth/login", {
        userName: loginId,
        password: password,
      });
      console.log("Response", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  forgotPassword: async (emailId) => {
    try {
      const res = await axios.post(api_url + "/auth/password/forgot", {
        emailId: emailId,
      });
      console.log("Response", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  resetPassword: async (userId, nonce, password) => {
    try {
      const res = await axios.post(
        `${api_url}/auth/password/reset?userId=${userId}&nonce=${nonce}`,
        {
          password: password,
        }
      );
      console.log("Response", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },
};

export default AuthServices;
