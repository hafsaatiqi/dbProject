// src/pages/BorrowingPage.js
/*import React, { useState, useEffect } from 'react';
import './BorrowingPage.css';  // Import the CSS file

const BorrowingPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch borrowed books data from your backend API
    // Example:
    // fetch('http://localhost:5000/api/borrowedBooks')
    //   .then(response => response.json())
    //   .then(data => setBorrowedBooks(data));
    
    setBorrowedBooks([
      { borrowingId: '1', bookTitle: 'Book 1', memberName: 'John Doe', borrowDate: '2024-11-01', dueDate: '2024-11-15' },
      { borrowingId: '2', bookTitle: 'Book 2', memberName: 'Jane Doe', borrowDate: '2024-11-02', dueDate: '2024-11-16' }
    ]);
  }, []);

  return (
    <div className="borrowing-page">
      <h1>Borrowed Books</h1>
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
          {borrowedBooks.map((borrowing) => (
            <tr key={borrowing.borrowingId}>
              <td>{borrowing.bookTitle}</td>
              <td>{borrowing.memberName}</td>
              <td>{borrowing.borrowDate}</td>
              <td>{borrowing.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingPage;
*/
import React, { useState, useEffect } from 'react';
import { getBorrowedBooks } from '../api/borrowApi';  // Import the API function
import './BorrowingPage.css';
const BorrowingPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Call the API function to fetch borrowed books
    const fetchBorrowedBooks = async () => {
      try {
        const borrowedBooksData = await getBorrowedBooks();
        setBorrowedBooks(borrowedBooksData);
      } catch (error) {
        console.error('Failed to fetch borrowed books:', error);
      }
    };
    fetchBorrowedBooks();
  }, []);  // Runs only once after component mounts

  return (
    <div className="borrowing-page">
      <h1>Borrowed Books</h1>
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
          {borrowedBooks.map((borrowing) => (
            <tr key={borrowing.borrowingId}>
              <td>{borrowing.bookTitle}</td>
              <td>{borrowing.memberName}</td>
              <td>{borrowing.borrowDate}</td>
              <td>{borrowing.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingPage;
