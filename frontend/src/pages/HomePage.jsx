// src/pages/HomePage.js
/*import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Library</h1>
      <p>This is the home page of our library system.</p>
    </div>
  );
};

export default HomePage;
*/
/*import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Library</h1>
      <p>Explore our wide range of books and manage your borrowing seamlessly!</p>
      <button className="explore-button">Explore Books</button>
    </div>
  );
};

export default HomePage;
*/
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
          <a href="/about">About</a>
           <a href="/contact">Contact</a>
           <Link to="/login" className="login-link">Login</Link> {/* Add the Login link here */}
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-container">
        <div className="home-image"></div>
        <div className="home-text">
          <h1>Welcome to Our Library</h1>
          <p>Explore our collection of books and resources.</p>
          <button className="explore-button">Explore</button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
