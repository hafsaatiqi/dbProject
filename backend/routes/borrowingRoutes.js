const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Path to your User model
//const Book = require('../models/book'); // Path to your Book model
const { getBorrowings, addBorrowing, updateBorrowing, deleteBorrowing, returnBook, getMBorrowings } = require('../controllers/borrowingController');
//const { authMiddleware } = require('../middleware/authMiddleware');
const { authMiddleware, checkRole } = require('../middleware/authMiddleware');

// Routes
router.get('/', getBorrowings);
router.post('/borrow', addBorrowing);
router.put('/:id', updateBorrowing); /// no use 
router.delete('/delete/:id', deleteBorrowing);
//router.put('/return/:borrowingId', returnBook);
//router.get('/user', authMiddleware, getMBorrowings);  // Added this route
router.get('/getMB/:id', getMBorrowings); //! removing auth 
//router.put('/return/:id', authMiddleware, checkRole(['member']),returnBook); //,authMiddleware,checkRole(['member']),
router.put('/return/:id',returnBook); //,authMiddleware,checkRole(['member']),

module.exports = router;
//router.delete('/:id', authMiddleware, checkRole(['admin']), deleteBook);
