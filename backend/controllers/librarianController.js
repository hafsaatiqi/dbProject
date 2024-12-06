const Librarian = require('../models/librarians');

// Middleware to check for admin role (can be reused across controllers)
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Get all librarians
const getLibrarians = async (req, res) => {
  try {
    const librarians = await Librarian.find();
    res.status(200).json(librarians);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! Add a new librarian
const addLibrarian = async (req, res) => {
  const newLibrarian = new Librarian(req.body);
  try {
    const savedLibrarian = await newLibrarian.save();
    res.status(201).json(savedLibrarian);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Update a librarian (admin only)
const updateLibrarian = async (req, res) => {
  try {
    const updatedLibrarian = await Librarian.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedLibrarian);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a librarian (admin only)
const deleteLibrarian = async (req, res) => {
  try {
    await Librarian.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Librarian deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getLibrarians, addLibrarian, updateLibrarian, deleteLibrarian,verifyAdmin };
