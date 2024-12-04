const express = require('express');
const router = express.Router();
const { getFines, addFine, updateFine, deleteFine, getMemberFines } = require('../controllers/fineController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Routes
router.get('/', getFines);
router.post('/', addFine);
router.put('/:id', updateFine);
router.delete('/:id', deleteFine);
router.get('/my-fines', authMiddleware, getMemberFines);
module.exports = router;
