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


