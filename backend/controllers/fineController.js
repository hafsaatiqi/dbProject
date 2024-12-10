//const Fine = require('../models/fines');
//!
const express = require('express');
const User = require('../models/user');
const Fine = require('../models/fines')
const router = express.Router();
//!

//anyone can access 
const getFines = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming authentication middleware provides the member ID
    console.log(userId);
    const fines = await Fine.find({ userId })
      .populate('borrowingId', 'bookId dueDate returnDate')
      .populate('borrowingId.bookId', 'title');

    res.status(200).json(fines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getMFines = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from request parameters
    console.log("User ID:", userId);

    // Retrieve all fines for the specified user
    const fines = await Fine.find({ userId }); 
    console.log(fines);
    // Check if no fines are found
    if (!fines || fines.length === 0) {
      return res.status(404).json({ message: 'No fines to show' });
    }

    console.log("Fines retrieved:", fines); // Log fines for debugging

    // Return fines as response
    res.status(200).json(fines);
  } catch (err) {
    console.error("Error fetching fines:", err.message); // Log the error
    res.status(500).json({ message: err.message });
  }
};


//!if auth is to be added in getFines
/*
const getFines = async (req, res) => {
  try {
    if (req.user.role !== 'member') {
      return res.status(403).json({ message: 'Access denied. Only members can view fines.' });
    }

    const userId = req.user.userId;
    console.log(userId);
    const fines = await Fine.find({ userId })
      .populate('borrowingId', 'bookId dueDate returnDate')
      .populate('borrowingId.bookId', 'title');

    res.status(200).json(fines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};
*/

/*
const addFine = async (req, res) => {
  try {
    if (req.user.role !== 'librarian') {
      return res.status(403).json({ message: 'Access denied. Only librarian can view fines.' });
    }

    const newFine = new Fine(req.body);

    try {
      const savedFine = await newFine.save();
      res.status(201).json(savedFine);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
*/

// Update a fine (delete this)
/*
const updateFine = async (req, res) => {
  try {
    if (req.user.role !== 'librarian') {
      return res.status(403).json({ message: 'Access denied. Only librarian can update fines.' });
    }
  try {
    const updatedFine = await Fine.findOne(req.params.id, req.body, { new: true });
    //res.status(200).json(updatedFine);
    const savedFine = await updatedFine.save();
    res.status(201).json(savedFine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  }
  catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
*/

// Delete a fine
/*
const deleteFine = async (req, res) => {
  try {
    await Fine.findOneAndDelete({fineId: req.params.id}); 
    res.status(200).json({ message: 'Fine deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
*/

const deleteFine = async (req, res) => {
  try {
    //!
    if (req.user.role !== 'librarian') {
      return res.status(403).json({ message: 'Access denied. Only librarians can delete fines.' });
    }
    //!
    console.log(req.params.id);
    const fineId = await Fine.findByIdAndDelete(req.params.id);
    if (!fineId) return res.status(404).json({ message: 'FineId not found' });
    res.json({ message: 'Fine deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getFines, deleteFine, getMFines };

