const Borrowing = require('../models/borrowing');

// Get all borrowings
const getBorrowings = async (req, res) => {
  try {
    const borrowing = await Borrowing.find();
    res.status(200).json(borrowing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new borrowing
const addBorrowing = async (req, res) => {
  const newBorrowing = new Borrowing(req.body);
  try {
    const savedBorrowing = await newBorrowing.save();
    res.status(201).json(savedBorrowing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a borrowing
const updateBorrowing = async (req, res) => {
  try {
    const updatedBorrowing = await Borrowing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBorrowing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a borrowing
const deleteBorrowing = async (req, res) => {
  try {
    await Borrowing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Borrowing deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getBorrowings, addBorrowing, updateBorrowing, deleteBorrowing };
