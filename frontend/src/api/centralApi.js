import axios from 'axios';

// Backend base URL (update with your actual backend URL)
const API_URL = 'http://127.0.0.1:5000/api/auth';

// User signup
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

// User login
export const login = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};

// Fetch user profile
export const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
