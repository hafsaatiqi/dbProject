import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowingList = () => {
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/borrowings')
      .then((res) => setBorrowings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Borrowing Records</h1>
      <ul>
        {borrowings.map((borrowing) => (
          <li key={borrowing._id}>
            Book: {borrowing.bookId} - Member: {borrowing.memberId} - Status: {borrowing.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowingList;
