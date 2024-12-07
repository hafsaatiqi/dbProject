import React, { useState, useEffect } from 'react';
import { getBorrowedBooks } from '../api/index';  // Assuming this is your API call for fetching borrowed books
import './BorrowingPage.css';

const BorrowingPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);  // To store error messages

  useEffect(() => {
    // Fetch all borrowings from your backend API
    const fetchBorrowedBooks = async () => {
      try {
        const borrowedBooksData = await getBorrowedBooks();
        setBorrowedBooks(borrowedBooksData);  // Assuming response is an array of borrowings
      } catch (error) {
        setError('Failed to fetch borrowed books');
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, []);  // Empty dependency array means this effect runs only once after the first render

  return (
    <div className="borrowing-page">
      <h1>Borrowed Books</h1>
      {error && <p className="error">{error}</p>}  {/* Display error message if any */}
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Member Name</th>
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
              <tr key={borrowing.borrowingId}>
                <td>{borrowing.bookTitle}</td>
                <td>{borrowing.memberName}</td>
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
