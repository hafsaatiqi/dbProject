import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Library Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} - {book.isAvailable ? 'Available' : 'Borrowed'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default bookList;
