const Borrowing = require('../models/borrowing');
const Fine = require('../models/fine');
const {calculateFine} = require('./utils/helpers');

const { ObjectId } = mongoose.Types;
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
const returnBook = async (req, res) => {
  try {
    const { borrowingId } = req.params;
    const returnDate = new Date();

    // Find borrowing record
    const borrowing = await Borrowing.findById(borrowingId).populate('memberId bookId');
    if (!borrowing) {
      return res.status(404).json({ message: 'Borrowing record not found' });
    }

    // Check if the book has already been returned
    if (borrowing.isReturned) {
      return res.status(400).json({ message: 'Book already returned' });
    }

    // Calculate fine if overdue
    const fineAmount = calculateFine(borrowing.dueDate, returnDate);

    // Update borrowing record
    borrowing.returnDate = returnDate;
    borrowing.isReturned = true;
    await borrowing.save();

    // Add a fine record if applicable
    if (fineAmount > 0) {
      const newFine = new Fine({
        fineId:new ObjectId(),
        memberId: borrowing.memberId._id,
        borrowingId: borrowing._id,
        amount: fineAmount,
        paymentStatus: false,
        fineDate: new Date()
      });
      await newFine.save();
    }

    res.status(200).json({
      message: 'Book returned successfully',
      fine: fineAmount > 0 ? `Fine of $${fineAmount} incurred` : 'No fine incurred',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { getBorrowings, addBorrowing, updateBorrowing, deleteBorrowing };
