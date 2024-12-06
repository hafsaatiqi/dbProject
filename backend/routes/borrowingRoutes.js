const express = require('express');
const router = express.Router();
const { getBorrowings, addBorrowing, updateBorrowing, deleteBorrowing, returnBook } = require('../controllers/borrowingController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Routes
router.get('/', getBorrowings);
router.post('/borrow', addBorrowing);
router.put('/:id', updateBorrowing);
router.delete('/:id', deleteBorrowing);
router.put('/return/:borrowingId', returnBook);
module.exports = router;
