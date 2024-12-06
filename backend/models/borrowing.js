const mongoose = require('mongoose');

const BorrowingSchema = new mongoose.Schema({
  borrowingId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.String, ref: 'Book', required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  isReturned: { type: Boolean, default: false },
});

module.exports = mongoose.model('Borrowing', BorrowingSchema);
