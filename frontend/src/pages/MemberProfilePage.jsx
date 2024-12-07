import React, { useState, useEffect } from "react";
import "./MemberProfilePage.css";

const MemberProfilePage = () => {
  const [member, setMember] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [fines, setFines] = useState([]);

  useEffect(() => {
    setMember({
      memberId: "1",
      fullName: "John Doe",
      email: "johndoe@example.com",
      membershipExpiry: "2025-11-01",
    });

    setBorrowedBooks([
      { borrowingId: "b1", title: "Book A", borrowDate: "2023-08-01" },
      { borrowingId: "b2", title: "Book B", borrowDate: "2023-09-15" },
      { borrowingId: "b3", title: "Book C", borrowDate: "2023-11-01" },
    ]);

    setFines([
      { fineId: "f1", amount: 50, reason: "Late return for Book A" },
      { fineId: "f2", amount: 30, reason: "Damaged Book B" },
    ]);
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
      {member ? (
        <div>
          <p>
            <strong>Name:</strong> {member.fullName}
          </p>
          <p>
            <strong>Email:</strong> {member.email}
          </p>
          <p>
            <strong>Membership Expiry:</strong> {member.membershipExpiry}
          </p>
        </div>
      ) : (
        <p className="loading-text">Loading member details...</p>
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
  );
};

export default MemberProfilePage;
