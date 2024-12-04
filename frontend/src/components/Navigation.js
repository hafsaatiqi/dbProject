
/*import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Make sure to create this CSS file

const Navigation = () => (
  <nav className="navbar">
    <Link to="/" className="nav-link">Home</Link>
    <Link to="/books" className="nav-link">Books</Link>
    <Link to="/borrow" className="nav-link">Borrow</Link>
    <Link to="/profile" className="nav-link">Profile</Link>
    <Link to="/admin" className="nav-link">Admin</Link>
  </nav>
);

export default Navigation;

/*import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/books">Books</Link>
    <Link to="/borrow">Borrow</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/admin">Admin</Link>
  </nav>
);

export default Navigation;
*/

import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Make sure this CSS file is created

const Navigation = () => (
  <header className="navbar-container">
    <div className="logo">📚 Library System</div>
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/books" className="nav-link">Books</Link>
      <Link to="/borrow" className="nav-link">Borrow</Link>
      <Link to="/profile" className="nav-link">Profile</Link>
      <Link to="/admin" className="nav-link">Admin</Link>
    </nav>
  </header>
);

export default Navigation;

