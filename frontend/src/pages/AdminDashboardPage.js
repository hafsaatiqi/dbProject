import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import './AdminDashboardPage.css';


const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        if (userRole === 'admin') {
          setIsAdmin(true);
        } else {
<<<<<<< Updated upstream
          setErrorMessage('Only admin users can access this page.');
          setIsAdmin(false);
=======
          setErrorMessage('Acess Denied. This page is for admins only!');
          setIsAdmin(false); // User is not an admin
>>>>>>> Stashed changes
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        setErrorMessage('Invalid or expired token. Please log in again.');
        setIsAdmin(false);
      }
    }
  }, [navigate]);

  if (isAdmin === null) {
    return <p>Loading...</p>;
  }

  if (isAdmin === false) {
    return (
      <div className="error-message-container">
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard.</p>
      <div className="button-container">
        {/* <button onClick={() => navigate('/books')} className="nav-button">
          View Books
        </button>
        <button onClick={() => navigate('/borrow')} className="nav-button">
          Manage Borrowings
        </button> */}
        <button onClick={() => navigate('/members')} className="nav-button">
          Manage Members
        </button>
        <button onClick={() => navigate('/librarians')} className="nav-button">
          Manage Librarians
        </button> {/* New Button */}
        <button onClick={() => navigate('/manage-books')} className="nav-button">
          Manage Books
        </button>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
