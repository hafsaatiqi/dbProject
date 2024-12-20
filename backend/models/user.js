const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    //enum: ['admin', 'librarian', 'member'],
    enum: ['admin', 'librarian', 'member'],
    default: 'member',
  },
});

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.methods.comparePassword = function (enteredPassword) {
  console.log(enteredPassword, "-----", this.password);
  return enteredPassword==this.password;
};

module.exports = mongoose.model('User', userSchema);
