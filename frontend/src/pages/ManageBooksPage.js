import React, { useState, useEffect } from 'react';
import './ManageBooksPage.css';
import axios from 'axios'; // Assuming axios is used for making HTTP requests
const token = localStorage.getItem('token');  // Ensure you have the token

const ManageBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    bookId: '',
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    genre: '',
    language: '',
    yearPublished: '',
    numberOfCopies: '',
    availableCopies: ''
  });
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState(null);

  // Fetch books when component loads
  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');  // Ensure you have the token

      try {
        const response = await axios.get('http://localhost:5000/api/books', {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in the header
          },
        });
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  // Handle form input changes for adding/editing books
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingBook) {
      setEditingBook({
        ...editingBook,
        [name]: value
      });
    } else {
      setNewBook({
        ...newBook,
        [name]: value
      });
    }
  };

  // Add a new book
  const addBook = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

      const response = await axios.post( 'http://localhost:5000/api/books',
        newBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
          },
        });
      setBooks([...books, response.data]);
      setNewBook({
        bookId: '',
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        genre: '',
        language: '',
        yearPublished: '',
        numberOfCopies: '',
        availableCopies: ''
      });
    } catch (err) {
      setError('Failed to add book');
    }
  };

  // Edit an existing book
  const updateBook = async () => {
    try {
      const response = await axios.put(
        `/api/books/${editingBook._id}`,
        editingBook,  // Send the editingBook object as the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );      const updatedBooks = books.map((book) =>
        book._id === editingBook._id ? response.data : book
      );
      setBooks(updatedBooks);
      setEditingBook(null);
    } catch (err) {
      setError('Failed to update book');
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  return (
    <div className="manage-books-page">
      <h1>Manage Books</h1>

      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}

      <div className="form-container">
        {/* Add/Update Book Form */}
        <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editingBook ? updateBook() : addBook();
          }}
        >
          <input
            type="text"
            name="bookId"
            value={editingBook ? editingBook.bookId : newBook.bookId}
            onChange={handleInputChange}
            placeholder="Book ID"
            required
          />
          <input
            type="text"
            name="title"
            value={editingBook ? editingBook.title : newBook.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
          <input
            type="text"
            name="author"
            value={editingBook ? editingBook.author : newBook.author}
            onChange={handleInputChange}
            placeholder="Author"
            required
          />
          <input
            type="text"
            name="publisher"
            value={editingBook ? editingBook.publisher : newBook.publisher}
            onChange={handleInputChange}
            placeholder="Publisher"
          />
          <input
            type="text"
            name="isbn"
            value={editingBook ? editingBook.isbn : newBook.isbn}
            onChange={handleInputChange}
            placeholder="ISBN"
          />
          <input
            type="text"
            name="genre"
            value={editingBook ? editingBook.genre : newBook.genre}
            onChange={handleInputChange}
            placeholder="Genre"
          />
          <input
            type="text"
            name="language"
            value={editingBook ? editingBook.language : newBook.language}
            onChange={handleInputChange}
            placeholder="Language"
          />
          <input
            type="number"
            name="yearPublished"
            value={editingBook ? editingBook.yearPublished : newBook.yearPublished}
            onChange={handleInputChange}
            placeholder="Year Published"
          />
          <input
            type="number"
            name="numberOfCopies"
            value={editingBook ? editingBook.numberOfCopies : newBook.numberOfCopies}
            onChange={handleInputChange}
            placeholder="Number of Copies"
            required
          />
          <input
            type="number"
            name="availableCopies"
            value={editingBook ? editingBook.availableCopies : newBook.availableCopies}
            onChange={handleInputChange}
            placeholder="Available Copies"
            required
          />
          <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
        </form>
      </div>

      {/* Book List */}
      <h2>Books List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <div className="book-details">
              <p><strong>{book.title}</strong> by {book.author}</p>
              <button onClick={() => setEditingBook(book)}>Edit</button>
              <button onClick={() => deleteBook(book._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBooksPage;