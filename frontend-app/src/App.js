
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BorrowingPage from './pages/BorrowingPage';
import MemberProfilePage from './pages/MemberProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import Navigation from './components/Navigation';
import CurrentRoute from './components/CurrentRoute';  // Import the CurrentRoute component
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <CurrentRoute />  {/* Add this for route logging */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/borrow" element={<BorrowingPage />} />
        <Route path="/profile" element={<MemberProfilePage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;


