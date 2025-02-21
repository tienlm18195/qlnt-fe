import axiosClient from "../services/AxiosClient";

const baseURL = "http://localhost:8080/";
const registrationAPI = "/api/rs";
const settingAPI = "/api/ss"

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

export const getAllUsers = (searchData) => {
  const jwt = localStorage.getItem("jwt");
  return axiosClient.get(`${settingAPI}/users`, {
    params: {
      fullName: searchData.fullName,
      email: searchData.email,
      phone: searchData.phone,
      identityNumber: searchData.iNumber,
      address: searchData.address,
      isBlackList: searchData.isBlackList,
      isDeleted: searchData.isDeleted,
      status: searchData.status,
      page: searchData.page,
      size: searchData.size
    },
    headers: {Authorization: `Bearer ${jwt}` }
  });
};
