// src/pages/AdminDashboardPage.js
import React,{useref} from 'react';
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



