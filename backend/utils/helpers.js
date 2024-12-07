// backend/utils/helpers.js

const calculateFine = (dueDate, returnDate = new Date()) => {
    const overdueDays = Math.max(
      0,
      Math.ceil((new Date(returnDate) - new Date(dueDate)) / (1000 * 60 * 60 * 24))
    );
    const finePerDay = 10; // Customize this value
    return overdueDays * finePerDay;
  };
  const crypto = require('crypto');

// A simple "hash" function using the built-in Node.js crypto library (not secure)
function hash1(input) {
  const hash = crypto.createHash('sha256'); // SHA256 hash algorithm
  hash.update(input);  // Feed input into the hash
  return hash.digest('hex');  // Return the hash as a hexadecimal string
}
  module.exports = { calculateFine, hash1 };
 