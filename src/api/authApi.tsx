import axiosClient from "../services/AxiosClient";

const baseURL = "http://localhost:8080/";
const registrationAPI = "/api/rs";

export const authenticate = (username, password) => {
  return axiosClient.post(baseURL + "authenticate", {username, password});
};

export const validToken = (username) => {
  const jwt = localStorage.getItem("jwt");
  return axiosClient.post('valid_token', { username }, {headers: {Authorization: `Bearer ${jwt}` }});
};

export const registerUser = (data) => {
  return axiosClient.post(`${registrationAPI}/sign_up`,  { userName: data.username, password: data.password });
};