import axios from "axios";

const baseURL = "http://localhost:8080/";
export const getJwtToken = () => {
  return localStorage.getItem("jwt");
};

export const authenticate = (username, password) => {
  return axios.post(baseURL + "authenticate", {username, password});
};

export const validToken = (username) => {
  const jwt = getJwtToken();
  const headers = {'Authorization': "Bearer " + jwt};
  return axios.post(baseURL + 'valid_token', {username: username}, {headers});
};
