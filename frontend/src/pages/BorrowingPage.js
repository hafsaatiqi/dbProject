
// import React, { useState, useEffect } from 'react';
// import { getBorrowedBooks } from '../api'; // API call for fetching borrowed books
// import './BorrowingPage.css';
// import axios from "axios";

// const BorrowingPage = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [error, setError] = useState(null); // To store error messages

//   useEffect(() => {
//     // Fetch all borrowings from the backend API
//     const fetchBorrowedBooks = async () => {
//       try {
//         const response = await getBorrowedBooks();
//         console.log('API Response:', response.data); // Log API response
//         setBorrowedBooks(response.data); // Set borrowed books data
//       } catch (error) {
//         setError('Failed to fetch borrowed books');
//         console.error('Error fetching borrowed books:', error);
//       }
//     };

//     fetchBorrowedBooks();
//   }, []); // Run only once after the first render

//   return (
//     <div className="borrowing-page">
//       <h1>Borrowed Books</h1>
//       {error && <p className="error">{error}</p>} {/* Display error message if any */}
//       <table>
//         <thead>
//           <tr>
//             <th>Book ID</th>
//             <th>User ID</th> 
//             <th>Borrow Date</th>
//             <th>Due Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {borrowedBooks.length === 0 ? (
//             <tr>
//               <td colSpan="4">No borrowed books found.</td>
//             </tr>
//           ) : (
//             borrowedBooks.map((borrowing) => (
//               <tr key={borrowing._id}>
//                 <td>{borrowing.bookId}</td>
//                 <td>{borrowing.userId}</td>
//                 <td>{new Date(borrowing.borrowDate).toLocaleDateString()}</td>
//                 <td>{new Date(borrowing.dueDate).toLocaleDateString()}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BorrowingPage;

//!!!!WITH AUTH

import { jwtDecode } from 'jwt-decode';  // Import jwt-decode to decode the token
import React, { useState, useEffect } from 'react';
import { getBorrowedBooks } from '../api'; // API call for fetching borrowed books
import './BorrowingPage.css';
import axios from "axios";
<<<<<<< Updated upstream
axios.defaults.baseURL = 'http://localhost:5000'; // Replace with the correct backend port

=======
//import jwtDecode from 'jwt-decode';  // Import jwt-decode to decode the token
>>>>>>> Stashed changes

const BorrowingPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null); // To store error messages
  const [hasAccess, setHasAccess] = useState(true); // To check if user has access to the page

  useEffect(() => {
    // Decode the token and check the role
    const token = localStorage.getItem("token");
    if (token) {
      try {
<<<<<<< Updated upstream
        const response = await getBorrowedBooks();
        setBorrowedBooks(response.data); // Set borrowed books data
      } catch (error) {
        setError('Failed to fetch borrowed books');
        console.error('Error fetching borrowed books:', error);
      }
    };
=======
        const decodedToken = jwtDecode(token); // Decode the token
        const userRole = decodedToken.role;  // Get the role from the decoded token
>>>>>>> Stashed changes

        if (userRole !== "admin" && userRole !== "librarian") {
          setHasAccess(false);  // Deny access if role is neither admin nor librarian
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        setHasAccess(false); // Deny access if there's an error decoding the token
      }
    } else {
      setHasAccess(false); // Deny access if there's no token
    }

    // Fetch all borrowings from the backend API if the user has access
    if (hasAccess) {
      const fetchBorrowedBooks = async () => {
        try {
          const response = await getBorrowedBooks();
          console.log('API Response:', response.data); // Log API response
          setBorrowedBooks(response.data); // Set borrowed books data
        } catch (error) {
          setError('Failed to fetch borrowed books');
          console.error('Error fetching borrowed books:', error);
        }
      };

      fetchBorrowedBooks();
    }

  }, [hasAccess]); // Run when hasAccess changes

  // If user doesn't have access, show the message
  if (!hasAccess) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>Only admins and librarians have access to this page.</p>
      </div>
    );
  }

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      console.log('delete id is ', id);
      console.log('API request URL:', `/api/borrowings/delete/${id}`);
      await axios.delete(`/api/borrowings/delete/${id}`); // Replace with your API endpoint
      setBorrowedBooks(borrowedBooks.filter((borrowing) => borrowing._id !== id));
    } catch (error) {
      console.error('Error deleting borrowing:', error);
      setError('Failed to delete borrowing.');
    }
  };


  return (
    <div className="borrowing-page">
      <h1>Borrowed Books</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>User ID</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th> {/* Add an Actions column */}
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.length === 0 ? (
            <tr>
              <td colSpan="5">No borrowed books found.</td>
            </tr>
          ) : (
            borrowedBooks.map((borrowing) => (
              <tr key={borrowing._id}>
                <td>{borrowing.bookId}</td>
                <td>{borrowing.userId}</td>
                <td>{new Date(borrowing.borrowDate).toLocaleDateString()}</td>
                <td>{new Date(borrowing.dueDate).toLocaleDateString()}</td>
                <td>{borrowing.isReturned.toString()}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(borrowing._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingPage;
