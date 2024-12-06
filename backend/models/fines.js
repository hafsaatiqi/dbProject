const mongoose = require('mongoose');

const FineSchema = new mongoose.Schema({
  fineId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  borrowingId: { type: mongoose.Schema.Types.String, ref: 'Borrowing', required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid'], required: true },
  fineDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Fine', FineSchema);
