const express = require('express');
const router = express.Router();
const { getBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController.js');
const { authMiddleware, checkRole } = require('../middleware/authMiddleware');

// Routes
router.get('/', getBooks); //no authentication required, anyone can do
router.post('/', authMiddleware, checkRole(['admin', 'librarian']), addBook);
router.put('/:id', authMiddleware, checkRole(['admin', 'librarian']), updateBook);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteBook);

module.exports = router;
