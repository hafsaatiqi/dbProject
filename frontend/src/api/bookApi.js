import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Borrow a book
export const borrowBook = async (bookId, memberId) => {
  try {
    const response = await axios.post(`${API_URL}/borrow`, { bookId, memberId });
    return response.data;
  } catch (error) {
    console.error('Error borrowing book:', error);
    throw error;
  }
};

// Fetch borrowed books
export const getBorrowedBooks = async (memberId) => {
  try {
    const response = await axios.get(`${API_URL}/borrowings/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};
