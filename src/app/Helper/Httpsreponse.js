import axios from "axios";

export const HttpAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_DEV || process.env.REACT_APP_BASE_URL_PROD
});