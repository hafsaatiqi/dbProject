import React, { useState, useEffect } from "react";
import { fetchBooks } from "../api"; // Import the fetchBooks API function
import "./BooksPage.css";

const BooksPage = () => {
  const [books, setBooks] = useState([]); // State for all books
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch books from backend on component mount
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        setLoading(true);
        const response = await fetchBooks(); // Call API to fetch books
        setBooks(response.data); // Set all books
        setFilteredBooks(response.data); // Initially, show all books
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      }
    };

    fetchBooksData();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  };

  // Handle borrowing a book (placeholder for future API integration)
  const handleBorrow = (bookId) => {
    alert(`Book with ID ${bookId} borrowed successfully!`);
    // TODO: Add backend API call to mark the book as borrowed
  };

  return (
    <div className="bookspage">
      <h1 className="books-heading">Books List</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Loading state */}
      {loading && <p>Loading books...</p>}

      {/* Error state */}
      {error && <p className="error-message">{error}</p>}

      {/* Books table */}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    <button
                      className="borrow-btn"
                      onClick={() => handleBorrow(book._id)}
                    >
                      Borrow
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksPage;
