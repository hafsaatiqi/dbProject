const mongoose = require('mongoose');

const BorrowingSchema = new mongoose.Schema({
  borrowingId: { type: String, required: true, unique: true },
  memberId: { type: mongoose.Schema.Types.String, ref: 'Member', required: true },
  bookId: { type: mongoose.Schema.Types.String, ref: 'Book', required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  isReturned: { type: Boolean, default: false },
});

module.exports = mongoose.model('Borrowing', BorrowingSchema);
