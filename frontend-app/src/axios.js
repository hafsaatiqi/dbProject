import axios from 'axios';

// Assuming your backend is running on port 5000
const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

export default instance;
