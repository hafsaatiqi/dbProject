import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

// Simulate fetching borrowed books from the backend
export const getBorrowedBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/borrowedBooks`);
    return response.data; // Assuming the server returns an array of borrowed books
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};

// Simulate borrowing a book
export const borrowBook = async (bookId) => {
  try {
    const response = await axios.post(`${API_URL}/borrow`, { bookId });
    return response.data;
  } catch (error) {
    console.error('Error borrowing book:', error);
    throw error;
  }
};
