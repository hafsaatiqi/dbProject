// src/pages/AdminDashboardPage.js
/*import React,{useref} from 'react';
import './AdminDashboardPage.css'
const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard" >
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard. Here you can manage books, members, and borrowings.</p>
      <ul>
        <li><a href="/books">View Books</a></li>
        <li><a href="/borrowings">Manage Borrowings</a></li>
        <li><a href="/members">Manage Members</a></li>
      </ul>
    </div>
  );
};

export default AdminDashboardPage;

*/
// src/pages/AdminDashboardPage.js





/* //!without auth
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate(); // Hook to handle navigation programmatically

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard. Here you can manage books, members, and borrowings.</p>
      <div className="button-container">
        <button onClick={() => navigate('/books')} className="nav-button">
          View Books
        </button>
        <button onClick={() => navigate('/borrowings')} className="nav-button">
          Manage Borrowings
        </button>
        <button onClick={() => navigate('/members')} className="nav-button">
          Manage Members
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
*/

//! with auth
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // null means we are still checking the role
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Check if the user is admin on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If there's no token, redirect to login
      navigate('/login');
    } else {
      try {
        const decodedToken = jwtDecode(token); 
        const userRole = decodedToken.role; 

        if (userRole === 'admin') {
          setIsAdmin(true); 
        } else {
          setErrorMessage('Only admin users can access this page.');
          setIsAdmin(false); // User is not an admin
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        setErrorMessage('Invalid or expired token. Please log in again.');
        setIsAdmin(false); // If there's an error decoding the token
      }
    }
  }, [navigate]);

  if (isAdmin === null) {
    // Optionally, show a loading state while checking the role
    return <p>Loading...</p>;
  }

  if (isAdmin === false) {
    return (
      <div className="error-message-container">
        <p>{errorMessage}</p>
      </div>
    );
  }

  // If user is admin, render the admin dashboard
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard. Here you can manage books, members, and borrowings.</p>
      <div className="button-container">
        <button onClick={() => navigate('/books')} className="nav-button">
          View Books
        </button>
        <button onClick={() => navigate('/borrowings')} className="nav-button">
          Manage Borrowings
        </button>
        <button onClick={() => navigate('/members')} className="nav-button">
          Manage Members
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
