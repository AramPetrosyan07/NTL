import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "ntl-api.vercel.app/",
  // baseURL: "http://localhost:4000/",
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("Bearer");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
