import axios from "axios";

// Create an Axios instance with the base URL of your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend's base URL
});

// Function to fetch books
export const fetchBooks = () => API.get("/books");
// src/api/borrowApi.js
export const getBorrowedBooks = async () => {
  const response = await fetch('http://localhost:5000/api/borrowings');  // Assuming your backend is running on localhost:5000
  if (!response.ok) {
    throw new Error('Failed to fetch borrowed books');
  }
  const data = await response.json();
  return data;
};

// Export other API functions here as needed
