import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8080/";

if (!baseURL.startsWith("http")) {
  console.error("❌ Invalid baseURL:", baseURL);
}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
