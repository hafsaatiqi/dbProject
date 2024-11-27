const Reservation = require('../models/reservations');

// Get all reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new reservation
const addReservation = async (req, res) => {
  const newReservation = new Reservation(req.body);
  try {
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a reservation
const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reservation deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getReservations, addReservation, updateReservation, deleteReservation };
