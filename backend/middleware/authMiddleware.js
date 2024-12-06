/*
const jwt = require('jsonwebtoken');

// authentication middleware
const authMiddleware = (req, res, next) => {
  // Expecting the token in the Authorization header as Bearer <token>
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Check Role Middleware (for different roles)
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied, insufficient permissions' });
    }
    next();
  };
};

module.exports = { authMiddleware, checkRole };
*/


const jwt = require('jsonwebtoken');

// Authentication middleware
const authMiddleware = (req, res, next) => {
  // Expecting the token in the Authorization header as Bearer <token>
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded; // Add the decoded user data to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Check Role Middleware (for different roles)
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied, insufficient permissions' });
    }
    next();
  };
};

// Admin-only access middleware (custom)
const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { authMiddleware, checkRole, checkAdmin };

