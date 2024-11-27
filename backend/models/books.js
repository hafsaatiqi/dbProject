const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String },
  isbn: { type: String, unique: true },
  genre: { type: String },
  language: { type: String },
  yearPublished: { type: Number },
  numberOfCopies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
});

module.exports = mongoose.model('Book', BookSchema);
