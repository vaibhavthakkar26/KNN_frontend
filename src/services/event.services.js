import axios from "axios";
import { api_url } from "../config";

const EventService = {
  getAllEvents: async (all) => {
    try {
      const res = await axios.get(`${api_url}/events?all=${all}`);
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  getEvent: async (eventId) => {
    try {
      const res = await axios.get(`${api_url}/events/${eventId}`);
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  eventRegistration: async (eventId, userId) => {
    try {
      const res = await axios.post(`${api_url}/events/registration`, {
        eventId: eventId,
        userId: userId,
      });
      console.log("Response: ", res);
      return res;
    } catch (error) {
      console.log("Error", error.response);
      return error.response;
    }
  },

  eventStatusChange: async (eventId, status) => {
    try {
      const res = await axios.put(`${api_url}/events/status/${eventId}`, {
        status: status,
      });
      console.log("eventStatusChange Response: ", res);
      return res;
    } catch (error) {
      console.log("eventStatusChange Error", error.response);
      return error.response;
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const res = await axios.delete(`${api_url}/events/${eventId}`);
      console.log("deleteEvent Response: ", res);
      return res;
    } catch (error) {
      console.log("deleteEvent Error", error.response);
      return error.response;
    }
  },

  createEvent: async (
    title,
    subTitle,
    body,
    startAt,
    endAt,
    createdBy,
    titleImage,
    shifts,
    eligibility,
    fee,
    venue,
    registrationEndAt,
    videoLink
  ) => {
    try {
      console.log("titleImage", titleImage);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("body", body);
      formData.append("startAt", startAt);
      formData.append("endAt", endAt);
      formData.append("createdBy", createdBy);
      formData.append("shifts", shifts);
      formData.append("eligibility", eligibility);
      formData.append("fee", fee);
      formData.append("venue", venue);
      formData.append("registrationEndAt", registrationEndAt);
      formData.append("videoLink", videoLink);
      formData.append("titleImage", titleImage);
      const res = await axios.post(`${api_url}/events`, formData);
      console.log("createEvent Response: ", res);
      return res;
    } catch (error) {
      console.log("createEvent Error", error.response);
      return error.response;
    }
  },

  updateEvent: async (
    eventId,
    title,
    subTitle,
    body,
    startAt,
    endAt,
    createdBy,
    titleImage,
    shifts,
    eligibility,
    fee,
    venue,
    registrationEndAt,
    videoLink
  ) => {
    try {
      console.log("titleImage", titleImage);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("body", body);
      formData.append("startAt", startAt);
      formData.append("endAt", endAt);
      formData.append("createdBy", createdBy);
      formData.append("shifts", shifts);
      formData.append("eligibility", eligibility);
      formData.append("fee", fee);
      formData.append("venue", venue);
      formData.append("registrationEndAt", registrationEndAt);
      formData.append("videoLink", videoLink);
      formData.append("titleImage", titleImage);
      const res = await axios.put(`${api_url}/events/${eventId}`, formData);
      console.log("updateEvent Response: ", res);
      return res;
    } catch (error) {
      console.log("updateEvent Error", error.response);
      return error.response;
    }
  },

  addBenifits: async (eventId, benefits) => {
    try {
      const res = await axios.post(`${api_url}/events/benefits`, {
        eventId: eventId,
        benefits: benefits,
      });
      console.log("addBenifits Response: ", res);
      return res;
    } catch (error) {
      console.log("addBenifits Error", error.response);
      return error.response;
    }
  },

  addLearning: async (eventId, learning) => {
    try {
      const res = await axios.post(`${api_url}/events/learning`, {
        eventId: eventId,
        learning: learning,
      });
      console.log("addLearning Response: ", res);
      return res;
    } catch (error) {
      console.log("addLearning Error", error.response);
      return error.response;
    }
  },

  addReq: async (eventId, req) => {
    try {
      const res = await axios.post(`${api_url}/events/requirements`, {
        eventId: eventId,
        requirements: req,
      });
      console.log("addReq Response: ", res);
      return res;
    } catch (error) {
      console.log("addReq Error", error.response);
      return error.response;
    }
  },

  addSpeaker: async (eventId, name, pic, company, designation) => {
    try {
      const formData = new FormData();
      formData.append("eventId", eventId);
      formData.append("profilePicture", pic);
      formData.append("name", name);
      formData.append("designation", designation);
      formData.append("company", company);
      const res = await axios.post(`${api_url}/events/speaker`, formData);
      console.log("addSpeaker Response: ", res);
      return res;
    } catch (error) {
      console.log("addSpeaker Error", error.response);
      return error.response;
    }
  },

  deleteBLRS: async (id, table) => {
    try {
      const res = await axios.delete(
        `${api_url}/events/blsr/${id}?table=${table}`
      );
      console.log("deleteBLRS Response: ", res);
      return res;
    } catch (error) {
      console.log("deleteBLRS Error", error.response);
      return error.response;
    }
  },
};

export default EventService;
