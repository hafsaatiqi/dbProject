import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemberProfilePage.css";

const MemberProfilePage = () => {
  const [member, setMember] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get member details
    // const fetchMemberDetails = async () => {
    //   try {
    //     const response = await axios.get("/api/member/details"); // Replace with the actual route for member details
    //     setMember(response.data);
    //   } catch (err) {
    //     console.error("Error fetching member details:", err);
    //   }
    // };

    // Get borrowed books for the logged-in user
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/borrowings/user");
        setBorrowedBooks(response.data);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
      }
    };

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
      await Promise.all([/*fetchMemberDetails(),*/ fetchBorrowedBooks(), fetchFines()]);
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
                <strong>Name:</strong> {member.fullName}
              </p>
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Membership Expiry:</strong> {new Date(member.membershipExpiry).toLocaleDateString()}
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
                      <strong>Title:</strong> {book.title}
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
