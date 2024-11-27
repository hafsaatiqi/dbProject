const mongoose = require('mongoose');

const LibrarianSchema = new mongoose.Schema({
  librarianId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  address: { type: String },
  hireDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Librarian', LibrarianSchema);
