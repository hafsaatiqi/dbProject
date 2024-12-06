/*
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// POST /api/auth/signup - Member Sign-Up (Only members can sign up)
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body; // Removed role from the input

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Set the role to 'member' by default
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      role: 'member' 
    });

    await newUser.save();
    res.status(201).json({ message: 'Member created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login - User Login (All roles can log in)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token with role included
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
*/


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {hash1}  = require('../utils/helpers');
const router = express.Router();

// Middleware to verify admin access
const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// POST /api/auth/signup - Member Sign-Up (Only members can sign up)
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = hash1(password);
    // Set the role to 'member' by default
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      role: 'member' 
    });

    await newUser.save();
    res.status(201).json({ message: 'Member created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// POST /api/auth/login - User Login (All roles can log in)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const hashed = hash1(password);
    const isMatch = await user.comparePassword(hashed);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



/*
// POST /api/auth/login - User Login (All roles can log in)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Debug log: Check the received email and password
    console.log("Login attempt with email:", email);
    console.log("Entered password:", password); // Log the entered password

    const user = await User.findOne({ email });
    if (!user) {
      // Debug log: User not found
      console.log("No user found with this email");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Debug log: Check the stored password hash
    console.log("Stored password hash:", user.password);

    // Manual password comparison test
    const enteredPassword = password; // Password entered in Postman
    const storedPasswordHash = user.password; // Stored hashed password in the database

    const isMatch = await bcrypt.compare(enteredPassword, storedPasswordHash);
    console.log('Manual password match test:', isMatch); // This will log 'true' if passwords match, otherwise 'false'

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token with role included
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error); // Enhanced error logging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

*/


// POST /api/auth/add-librarian - Admin adds a librarian
router.post('/add-librarian', verifyAdmin, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Librarian already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newLibrarian = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      role: 'librarian' 
    });

    await newLibrarian.save();
    res.status(201).json({ message: 'Librarian added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


//authroutes userroutes serverjs env