import React, { useState, useEffect } from "react";
import { fetchBooks } from "../api"; // Import the fetchBooks API function
import "./BooksPage.css";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';



const BooksPage = () => {
  const [books, setBooks] = useState([]); // State for all books
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  //const userId = localStorage.getItem('userId'); //!


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
        book.genre.toLowerCase().includes(term) ||
        book.publisher?.toLowerCase().includes(term) || // Include publisher
        book.language?.toLowerCase().includes(term)    // Include language
    );
    setFilteredBooks(filtered);
  };

  // Handle borrowing a book (placeholder for future API integration)
  const handleBorrow = async (bookId) => {
    //!
    const token = localStorage.getItem('token');
    console.log('Token:', token); //! debug
    if (!token) {
      setError('Please login to borrow books');
      return;
    }
  
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken); //! debug
    const userId = decodedToken.userId;
    console.log("UserId: ",userId);
    //!
    //const userId = "6755c3431a44183877fabfdb"//! //localStorage.getItem("userId"); // Replace this with the actual logged-in user's ID, fetched from context or state.
    //setLoading(true); // Set loading to true when request starts
    try {
      const response = await axios.post(
        "http://localhost:5000/api/borrowings/borrow", // Adjust the API URL as per your backend
        { userId, bookId } 
      );
      alert("Book borrowed successfully!");
  
      // Update the book's availableCopies in the UI
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.bookId === bookId
            ? { ...book, availableCopies: book.availableCopies - 1 }
            : book
        )
      );
      setFilteredBooks((prevFilteredBooks) =>
        prevFilteredBooks.map((book) =>
          book.bookId === bookId
            ? { ...book, availableCopies: book.availableCopies - 1 }
            : book
        )
      );
    } catch (error) {
      console.error("Error borrowing book:", error.response?.data || error);
      alert(error.response?.data?.errors?.[0]?.msg || "Failed to borrow book.");
    }
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
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Language</th>
              <th>Year Published</th>
              <th>Number of Copies</th>
              <th>Available Copies</th>
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
                  <td>{book.publisher}</td>
                  <td>{book.isbn}</td>
                  <td>{book.language}</td>
                  <td>{book.yearPublished}</td>
                  <td>{book.numberOfCopies}</td>
                  <td>{book.availableCopies}</td>
                  <td>
                    {book.availableCopies > 0 ? (
                      <button
                        onClick={() => handleBorrow(book.bookId)}
                        className="borrow-button"
                      >
                        Borrow
                      </button>
                    ) : (
                      <span className="not-available">Not Available</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No books found.</td>
              </tr>
  )}
</tbody>
        </table>
      )}
    </div>
  );
};

export default BooksPage;
