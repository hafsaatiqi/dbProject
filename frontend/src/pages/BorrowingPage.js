import React, { useState, useEffect } from 'react';
import { getBorrowedBooks } from '../api'; // API call for fetching borrowed books
import './BorrowingPage.css';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000'; // Replace with the correct backend port


const BorrowingPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null); // To store error messages

  useEffect(() => {
    // Fetch all borrowings from the backend API
    const fetchBorrowedBooks = async () => {
      try {
        const response = await getBorrowedBooks();
        setBorrowedBooks(response.data); // Set borrowed books data
      } catch (error) {
        setError('Failed to fetch borrowed books');
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, []); // Run only once after the first render

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      console.log('delete id is ', id);
      console.log('API request URL:', `/api/borrowings/delete/${id}`);
      await axios.delete(`/api/borrowings/delete/${id}`); // Replace with your API endpoint
      setBorrowedBooks(borrowedBooks.filter((borrowing) => borrowing._id !== id));
    } catch (error) {
      console.error('Error deleting borrowing:', error);
      setError('Failed to delete borrowing.');
    }
  };


  return (
    <div className="borrowing-page">
      <h1>Borrowed Books</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>User ID</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th> {/* Add an Actions column */}
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.length === 0 ? (
            <tr>
              <td colSpan="5">No borrowed books found.</td>
            </tr>
          ) : (
            borrowedBooks.map((borrowing) => (
              <tr key={borrowing._id}>
                <td>{borrowing.bookId}</td>
                <td>{borrowing.userId}</td>
                <td>{new Date(borrowing.borrowDate).toLocaleDateString()}</td>
                <td>{new Date(borrowing.dueDate).toLocaleDateString()}</td>
                <td>{borrowing.isReturned.toString()}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(borrowing._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingPage;
