const mongoose = require('mongoose');

const FineSchema = new mongoose.Schema({
  fineId: { type: String, required: true, unique: true },
  memberId: { type: mongoose.Schema.Types.String, ref: 'Member', required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid'], required: true },
  fineDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Fine', FineSchema);
