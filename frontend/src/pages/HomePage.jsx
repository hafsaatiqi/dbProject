// src/pages/HomePage.js
import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'; 

function HomePage() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Library</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">Explore</a>
          <Link to="/login" className="login-link">Login</Link> {/* Login link in navbar */}
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-container">
        <div className="home-image"></div>
        <div className="home-text">
          <h1>Welcome to Our Library</h1>
          <p>Explore our collection of books and resources.</p>
          {/* Button leading to /login */}
          <Link to="/login">
            <button className="explore-button">Login or Signup</button> {/* Wrap the button in Link */}
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
