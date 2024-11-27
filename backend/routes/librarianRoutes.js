const express = require('express');
const router = express.Router();
const { getLibrarians, addLibrarian, updateLibrarian, deleteLibrarian } = require('../controllers/librarianController');

// Routes
router.get('/', getLibrarians);
router.post('/', addLibrarian);
router.put('/:id', updateLibrarian);
router.delete('/:id', deleteLibrarian);

module.exports = router;
