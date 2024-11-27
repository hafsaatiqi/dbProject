const express = require('express');
const router = express.Router();
const { getFines, addFine, updateFine, deleteFine } = require('../controllers/fineController');

// Routes
router.get('/', getFines);
router.post('/', addFine);
router.put('/:id', updateFine);
router.delete('/:id', deleteFine);

module.exports = router;
