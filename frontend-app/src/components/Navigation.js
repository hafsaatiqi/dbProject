import React from 'react';
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
