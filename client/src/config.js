import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:6969/api",
});

export const axiosUpload = axios.create({
  baseURL: "http://localhost:6969",
});
