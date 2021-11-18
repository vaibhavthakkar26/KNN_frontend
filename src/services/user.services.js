import axios from "axios";
import { api_url } from "../config";

const UserServices = {
  registerUser: async (
    fullname,
    username,
    email,
    mobilenumber,
    address,
    password
  ) => {
    try {
      const res = await axios.post(api_url + "/users", {
        firstName: fullname,
        lastName: "",
        userName: username,
        emailId: email,
        mobileNumber: mobilenumber,
        password: password,
        address: address,
        city: null,
        street: null,
      });
      // console.log("Response: ", res);
      return res;
    } catch (error) {
      // console.log("Error", error.response);
      return error.response;
    }
  },

  userNameAndEmailIdInUse: async (userNameEmail) => {
    try {
      const res = await axios.get(
        `${api_url}/users/verifyUserName?userName=${userNameEmail}`
      );
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  addToCart: async (userId, bookId, quantity) => {
    try {
      const res = await axios.post(`${api_url}/users/cart/add`, {
        userId: userId,
        bookId: bookId,
        quantity: quantity,
      });

      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getCartByUserId: async (userId) => {
    try {
      const res = await axios.get(`${api_url}/users/${userId}/cart`);

      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  deleteCartItem: async (cartId) => {
    try {
      const res = await axios.delete(`${api_url}/users/cart/${cartId}`);

      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  checkout: async (
    userId,
    firstName,
    lastName,
    emailId,
    mobileNumber,
    deliveryAddress,
    totalAmount
  ) => {
    try {
      const res = await axios.post(`${api_url}/users/order`, {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        mobileNumber: mobileNumber,
        deliveryAddress: deliveryAddress,
        totalAmount: totalAmount,
      });

      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getUserWithCount: async (userId) => {
    try {
      const res = await axios.get(`${api_url}/users/${userId}/count`);

      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  updateUser: async (
    userId,
    firstName,
    mobileNumber,
    address,
    profilePicture
  ) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
      formData.append("firstName", firstName);
      formData.append("mobileNumber", mobileNumber);
      formData.append("address", address);

      const res = await axios.put(`${api_url}/users/${userId}`, formData);

      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getUpdatedTokens: async (userId) => {
    try {
      const res = await axios.get(`${api_url}/auth/${userId}/tokens`);

      console.log("Response Updated Token: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },
};

export default UserServices;
