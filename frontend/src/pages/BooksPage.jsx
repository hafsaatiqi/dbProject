import React, { useState, useEffect } from "react";
import "./BooksPage.css";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books

  useEffect(() => {
    // Dummy hardcoded data
    const bookList = [
      { bookId: "1", title: "Book 1", author: "Author 1", genre: "Fiction" },
      { bookId: "2", title: "Book 2", author: "Author 2", genre: "Science" },
      { bookId: "3", title: "Book 3", author: "Author 3", genre: "History" },
      { bookId: "4", title: "Book 4", author: "Author 4", genre: "Adventure" },
    ];
    setBooks(bookList);
    setFilteredBooks(bookList); // Initially show all books
  }, []);

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

  const handleBorrow = (bookId) => {
    alert(`Book with ID ${bookId} borrowed successfully!`);
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
              <tr key={book.bookId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  <button
                    className="borrow-btn"
                    onClick={() => handleBorrow(book.bookId)}
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
    </div>
  );
};

export default BooksPage;
