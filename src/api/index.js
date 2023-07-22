import axios from "axios";

const baseURL = "http://localhost:8080/";
export const login = (username, password) => {
  return axios.post(baseURL + "authenticate", {username, password});
};
