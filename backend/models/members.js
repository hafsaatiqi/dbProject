const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  memberId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  address: { type: String },
  membershipDate: { type: Date, default: Date.now },
  membershipExpiry: { type: Date, required: true },
});

module.exports = mongoose.model('Member', MemberSchema);
