import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fakebook6969.herokuapp.com/api",
});

export const axiosUpload = axios.create({
  baseURL: "https://fakebook6969.herokuapp.com",
});
