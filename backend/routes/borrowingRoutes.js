const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Path to your User model
//const Book = require('../models/book'); // Path to your Book model
const { getBorrowings, addBorrowing, updateBorrowing, deleteBorrowing, returnBook } = require('../controllers/borrowingController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Routes
router.get('/', getBorrowings);
router.post('/borrow', addBorrowing);
router.put('/:id', updateBorrowing);
router.delete('/:id', deleteBorrowing);
router.put('/return/:borrowingId', returnBook);
router.put('/return/:id', returnBook);
module.exports = router;
