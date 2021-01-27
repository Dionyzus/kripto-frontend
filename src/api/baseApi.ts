import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  responseType: "json",
});

export const baseApi = {
  ...axiosInstance,
};
