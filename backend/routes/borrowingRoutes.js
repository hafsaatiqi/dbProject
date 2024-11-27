const express = require('express');
const router = express.Router();
const { getBorrowings, addBorrowing, updateBorrowing, deleteBorrowing } = require('../controllers/borrowingController');

// Routes
router.get('/', getBorrowings);
router.post('/', addBorrowing);
router.put('/:id', updateBorrowing);
router.delete('/:id', deleteBorrowing);

module.exports = router;
