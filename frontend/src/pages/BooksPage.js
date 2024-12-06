// src/pages/BooksPage.js
import React, { useState, useEffect } from 'react';
import './BooksPage.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books data from your backend API (or mock data)
    // Example:
    // fetch('http://localhost:5000/api/books')
    //   .then(response => response.json())
    //   .then(data => setBooks(data));
    
    setBooks([
      { bookId: '1', title: 'Book 1', author: 'Author 1', genre: 'Fiction' },
      { bookId: '2', title: 'Book 2', author: 'Author 2', genre: 'Science' }
    ]);
  }, []);

  return (
    <div className="bookspage">
      <h1 className="books-heading">Books List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default BooksPage;
// src/pages/BooksPage.js

