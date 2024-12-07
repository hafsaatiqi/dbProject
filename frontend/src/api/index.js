import axios from "axios";

// Create an Axios instance with the base URL of your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend's base URL
});

// Function to fetch books
export const fetchBooks = () => API.get("/books");

// Export other API functions here as needed
