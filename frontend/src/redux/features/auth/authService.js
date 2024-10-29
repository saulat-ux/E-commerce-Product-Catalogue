import axios from "axios";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_URL = "http://localhost:5000/";

export const API_URL = `${BACKEND_URL}api/v1/users/`;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData, {
    withCredentials: true,
  });
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get(API_URL + "logout", {
    withCredentials: true,
  });
  return response.data.message;
};

// Get user to check if they are authenticated
const getUser = async () => {
  const response = await axios.get(API_URL + "getuser", {
    withCredentials: true,
  });
  return response.data;
};

// Update user
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateuser", userData, {
    withCredentials: true,
  });
  return response.data.message;
};

const authService = {
  register,
  login,
  logout,
  getUser,
  updateUser,
};

export default authService;
