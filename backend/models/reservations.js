const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  reservationId: { type: String, required: true, unique: true },
  memberId: { type: mongoose.Schema.Types.String, ref: 'Member', required: true },
  bookId: { type: mongoose.Schema.Types.String, ref: 'Book', required: true },
  reservationDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Expired', 'Fulfilled'], required: true },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
