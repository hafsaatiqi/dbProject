const express = require('express');
const router = express.Router();
const { getMembers, addMember, updateMember, deleteMember } = require('../controllers/memberController');

// Routes
router.get('/', getMembers);
router.post('/', addMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
