import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemberProfilePage.css";
// State for errors

import { jwtDecode } from 'jwt-decode';

const MemberProfilePage = () => {
  const [member, setMember] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

   //! working 
    useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError('No user logged in!');
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; // Extract userId from the token
        console.log("Decoded User ID:", userId);
    
        const apiUrl = `http://127.0.0.1:5000/api/users/${userId}`;
        const response = await axios.get(apiUrl);
        setMember(response.data); // Assuming `setMember` updates the member details in state
    
        console.log("Member Details Fetched:", response.data);
      } catch (err) {
        console.error("Error fetching member details:", err);
      }
    };
    fetchMemberDetails();
  }, []);
    //!

    //!get borrwoing by id:
    //!book name not added in borrowing record. if time, add
    useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        //extraction start
        const token = localStorage.getItem("token");
        if (!token) {
          setError('No user logged in!');
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; // Extract userId from the token
        console.log("Decoded User ID:", userId);
        //extraction complete
        const apiUrl = `http://127.0.0.1:5000/api/borrowings/getMB/${userId}`;
        const response = await axios.get(apiUrl);
        setBorrowedBooks(response.data);
        console.log("Borrow details of user fetched:", response.data);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
      }
    };
    fetchBorrowedBooks();
  }, []);
    //!

    useEffect(() => { //!
    // Get fines for the logged-in user
    const fetchFines = async () => {
      try {
        const response = await axios.get("/api/myfines"); // This will now hit the correct endpoint
        setFines(response.data);
      } catch (err) {
        console.error("Error fetching fines:", err);
      }
    };

    // Fetch data when component mounts
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([/*fetchMemberDetails(),*/ /*fetchBorrowedBooks(),*/ fetchFines()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleReturnBook = (borrowingId) => {
    setBorrowedBooks((prevBooks) =>
      prevBooks.filter((book) => book.borrowingId !== borrowingId)
    );
    alert(`Book with ID: ${borrowingId} has been returned.`);
  };

  return (
    <div className="member-profile-page">
      <h1>Member Profile</h1>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div>
          {member ? (
            <div>
              <p>
                <strong>User Name:</strong> {member.username}
              </p>
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Role:</strong> {member.role}
              </p>
            </div>
          ) : (
            <p>No member details available.</p>
          )}

          <h2>Borrowed Books</h2>
          {borrowedBooks.length > 0 ? (
            <ul>
              {borrowedBooks.map((book) => (
                <li key={book.borrowingId}>
                  <div>
                    <p>
                      <strong>Title:</strong> {book.bookId}
                    </p>
                    <p>
                      <strong>Borrowed Date:</strong>{" "}
                      {new Date(book.borrowDate).toLocaleDateString()}
                    </p>
                    <button
                      className="return-button"
                      onClick={() => handleReturnBook(book.borrowingId)}
                    >
                      Return Book
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No borrowed books to show.</p>
          )}

          <h2>Fines</h2>
          {fines.length > 0 ? (
            <ul className="fines-list">
              {fines.map((fine) => (
                <li key={fine.fineId}>
                  <p>
                    <strong>Amount:</strong> ${fine.amount}
                  </p>
                  <p>
                    <strong>Reason:</strong> {fine.reason}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No fines to show.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberProfilePage;
