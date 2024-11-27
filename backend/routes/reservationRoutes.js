const express = require('express');
const router = express.Router();
const { getReservations, addReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');

// Routes
router.get('/', getReservations);
router.post('/', addReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

module.exports = router;
