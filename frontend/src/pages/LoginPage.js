import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './LoginPage.css';
import { login } from '../api/centralApi'; //!
import { signup } from '../api/centralApi'; //!
import jwt_decode from "jwt-decode";
const mongoose = require('mongoose');

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Add email state
  const [error, setError] = useState('');
  const [isLoginView, setIsLoginView] = useState(true); // State to toggle between Login/Signup views
  const navigate = useNavigate();

  // API URL
  //const apiUrl = 'http://localhost:5000/api/auth'; // Update with your backend URL
  const apiUrl = 'http://127.0.0.1:5000/api/auth'; 
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("function triggered"); // debugging line
    console.log('Form submitted with email:', email);  // Debugging line to check if form is being submitted
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      console.log('Response received:', response);  // Debugging: Check response object
      //!
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store the JWT token
        setError('');
        navigate('/dashboard'); //!  // Redirect to dashboard on successful login
      } else {
        console.error('Token not found in response');
      }
       // Redirect to dashboard on successful login
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error logging in');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/signup`, { username, email, password });
      alert('Signup successful!');
      setUsername('');
      setEmail('');
      setPassword('');
      setError('');
      setIsLoginView(true); // Switch to login view after signup
    } catch (err) {
      console.log('erroe is here');
      setError(err.response ? err.response.data.message : 'Error signing up');
    }
  };

  const toggleView = (viewType) => {
    setIsLoginView(viewType);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Header with dynamic title */}
        <h1>{isLoginView ? 'Login' : 'Signup'}</h1>
        
        {/* Login/Signup form */}
        <form
          onSubmit={isLoginView ? handleLogin : handleSignup}
          className="login-form"
        >
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!isLoginView && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">{isLoginView ? 'Login' : 'Signup'}</button>
        </form>


        {/* Toggle Links Section */}
        <div className="toggle-links">
          {isLoginView ? (
            <>
              <p>Don't have an account?</p>
              <button
                className="toggle-btn"
                onClick={() => toggleView(false)}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <button
                className="toggle-btn"
                onClick={() => toggleView(true)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
