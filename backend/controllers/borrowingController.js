const Borrowing = require('../models/borrowing');
const Fine = require('../models/fines');
const User = require('../models/user'); // Adjust the path as per your directory structure
const Book = require('../models/books'); // Adjust the path as per your directory structure

const {calculateFine} = require('../utils/helpers');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const { ObjectId } = mongoose.Types;
// Get all borrowings
const getBorrowings = async (req, res) => {
  try {
    const borrowing = await Borrowing.find().populate('book', 'title'); // Populate the 'book' field and only get the 'title' field
    res.status(200).json(borrowing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMBorrowings = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("user id:", userId);
    //const userId = req.user.userId; 
    // Find borrowings where userId matches
    //const borrowings = await Borrowing.find({ userId }).populate('bookId', 'title author');
    const borrowings = await Borrowing.find({ userId });
    // If no borrowings found for this user
    if (!borrowings.length) {
      return res.status(404).json({ message: 'No borrowings found for this user.' });
    }
    
    // Respond with the borrowings data
    res.status(200).json(borrowings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new borrowing
const addBorrowing = [
  // Validation rules
  check('userId').notEmpty().withMessage('Member ID is required')
    .custom(async (value) => {
      //const user = await User.findOne({userId:value});//!
      const user = await User.findById({_id:value});
      if (!user) {
        throw new Error('Member ID does not exist');
      }
      return true;
    }),
  check('bookId').notEmpty().withMessage('Book ID is required')
    .custom(async (value) => {
      const book = await Book.findOne({bookId:value});
      if (!book) {
        throw new Error('Book ID does not exist');
      }
      if (book.availableCopies === 0) {
        throw new Error('No available copies left to borrow');
      }
      return true;
    }),
  
  // Actual handler
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, bookId } = req.body; // Extract values from the request body
    // Fetch the book from the database
    const book = await Book.findOne({bookId});

    // Decrease availableCopies by 1
    if (book.availableCopies > 0) {
    book.availableCopies -= 1;
    await book.save();  // Save the updated book document
    } else {
    return res.status(400).json({ message: 'No available copies left to borrow' });
    }
    const borrowDate = new Date(); // Current date when the book is borrowed
    const dueDate = new Date(borrowDate); // Copy the borrowDate
    dueDate.setDate(borrowDate.getDate() + 10);
    // Create a new borrowing record
    const newBorrowing = new Borrowing({
      borrowingId: new mongoose.Types.ObjectId().toString(), // Generate a unique borrowing ID
      userId, // Member who is borrowing the book
      bookId, // The book being borrowed
      borrowDate,  
      dueDate,  // Due date of the book
      returnDate: null,
      isReturned: false, // Initially, the book is not returned
    });

    try {
      // Save the new borrowing record
      const savedBorrowing = await newBorrowing.save();
      res.status(201).json(savedBorrowing); // Return the saved record
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
];

// Update a borrowing (delete this,useless)
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
    await Borrowing.findByIdAndDelete(req.params.id );
    res.status(200).json({ message: 'Borrowing deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//!WORKS BUT DOSENT HAVE BOOKID AND USERID CHECK
/*
const returnBook = async (req, res) => {
  try {
    console.log(req.params.id);
    const { id } = req.params;  // Correcting the destructuring

    const returnDate = new Date();

    // Find borrowing record by _id
    const borrowing = await Borrowing.findOne({ _id: id });
    
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
    await borrowing.save();  // Save the updated borrowing document

    // Add a fine record if applicable
    if (fineAmount > 0) {
      const newFine = new Fine({
        fineId: new ObjectId(),
        userId: borrowing.userId,  // Directly using userId, no population needed
        borrowingId: borrowing.borrowingId,
        amount: fineAmount,
        paymentStatus: false,
        fineDate: new Date()
      });
      await newFine.save();  // Save the fine record
    }

    res.status(200).json({
      message: 'Book returned successfully',
      fine: fineAmount > 0 ? `Fine of $${fineAmount} incurred` : 'No fine incurred',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
*/
//!

const returnBook = async (req, res) => {
  try {
    // console.log(req.params.id);
    const  borrowingId  = req.params.id;
    console.log("Received Borrowing ID:", borrowingId); // Log the ID for debugging

    const returnDate = new Date();

    // Find borrowing record by _id
    const borrowing = await Borrowing.findOne({borrowingId: borrowingId});
    
    if (!borrowing) {
      return res.status(404).json({ message: 'Borrowing record not found' });
    }

    // Check if the user exists
    const user = await User.findOne({ userId: borrowing.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the book exists
    const book = await Book.findOne({ bookId: borrowing.bookId });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.availableCopies+=1;
    await book.save();

    // Check if the book has already been returned
    console.log(borrowing.id);
    console.log(borrowing.isReturned);
    if (borrowing.isReturned) {
      return res.status(400).json({ message: 'Book already returned' });
    }

    // Calculate fine if overdue
    const fineAmount = calculateFine(borrowing.dueDate, returnDate);

    // Update borrowing record
    borrowing.returnDate = returnDate;
    borrowing.isReturned = true;
    await borrowing.save();  // Save the updated borrowing document

    // Add a fine record if applicable
    if (fineAmount > 0) {
      const newFine = new Fine({
        fineId: new ObjectId(),  //new mongoose.Types.ObjectId().toString()
        userId: borrowing.userId,  // Directly using userId
        borrowingId: borrowing.borrowingId,
        amount: fineAmount,
        paymentStatus: "Unpaid",
        fineDate: new Date()
      });
      await newFine.save();  // Save the fine record
    }

    res.status(200).json({
      message: 'Book returned successfully',
      fine: fineAmount > 0 ? `Fine of $${fineAmount} incurred` : 'No fine incurred',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { getBorrowings, addBorrowing, updateBorrowing, deleteBorrowing, getMBorrowings, returnBook};
