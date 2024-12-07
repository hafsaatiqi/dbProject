// src/pages/LoginPage.js
/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'password') {
      setError('');
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}  
export default LoginPage;
*/
// src/pages/LoginPage.js
/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginView, setIsLoginView] = useState(true); // Toggle state for login/signup view
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Signup successful! (Simulation)');
    setUsername('');
    setPassword('');
    setError('');
    setIsLoginView(true);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>{isLoginView ? 'Login' : 'Signup'}</h1>
        <form
          onSubmit={isLoginView ? handleLogin : handleSignup}
          className="login-form"
        >
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
        <div className="toggle-links">
          {isLoginView ? (
            <>
              <p>Don't have an account?</p>
              <button
                className="toggle-btn"
                onClick={() => setIsLoginView(false)}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <button
                className="toggle-btn"
                onClick={() => setIsLoginView(true)}
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
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginView, setIsLoginView] = useState(true); // State to toggle between Login/Signup views
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Signup successful! (Simulation)');
    setUsername('');
    setPassword('');
    setError('');
    setIsLoginView(true);
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
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


