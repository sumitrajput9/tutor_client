// src/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post('https://testapi.tutorgator.com.au/web_login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};






export default api;
