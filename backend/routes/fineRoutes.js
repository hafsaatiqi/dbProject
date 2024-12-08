const express = require('express');
const router = express.Router();
const { getFines, addFine, updateFine, deleteFine, getMemberFines } = require('../controllers/fineController');
const { authMiddleware } = require('../middleware/authMiddleware');

/*
// Routes
router.get('/myfines', getFines);
router.post('/', addFine);
router.put('/:id', updateFine);
router.delete('/:id', deleteFine);
//router.get('/my-fines', authMiddleware, getMemberFines);
module.exports = router;
*/

//!
// Routes
router.get('/myfines', authMiddleware, getFines); // Add authMiddleware here
//router.post('/addfine', authMiddleware, addFine); // Apply authMiddleware if only authenticated users can add fines
//router.put('/:_id', authMiddleware, updateFine); // Apply authMiddleware for updates
router.delete('/:id', authMiddleware, deleteFine); // Apply authMiddleware for deletions
//router.get('/:id', getFineById);
//router.delete('/:id', deleteFine);
module.exports = router;
//!
