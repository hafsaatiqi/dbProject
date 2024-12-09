import React, { useState, useEffect } from 'react';
import { getBorrowedBooks } from '../api'; // API call for fetching borrowed books
import './BorrowingPage.css';
import axios from "axios";

const BorrowingPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null); // To store error messages

  useEffect(() => {
    // Fetch all borrowings from the backend API
    const fetchBorrowedBooks = async () => {
      try {
        const response = await getBorrowedBooks();
        console.log('API Response:', response.data); // Log API response
        setBorrowedBooks(response.data); // Set borrowed books data
      } catch (error) {
        setError('Failed to fetch borrowed books');
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, []); // Run only once after the first render

  return (
    <div className="borrowing-page">
      <h1>Borrowed Books</h1>
      {error && <p className="error">{error}</p>} {/* Display error message if any */}
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>User ID</th> 
            <th>Borrow Date</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.length === 0 ? (
            <tr>
              <td colSpan="4">No borrowed books found.</td>
            </tr>
          ) : (
            borrowedBooks.map((borrowing) => (
              <tr key={borrowing._id}>
                <td>{borrowing.bookId}</td>
                <td>{borrowing.userId}</td>
                <td>{new Date(borrowing.borrowDate).toLocaleDateString()}</td>
                <td>{new Date(borrowing.dueDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingPage;