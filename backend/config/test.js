const crypto = require('crypto');

// A simple "hash" function using the built-in Node.js crypto library (not secure)
function simpleHash(input) {
  // Use a basic hashing algorithm (like SHA256) to generate a hash of the input
  const hash = crypto.createHash('sha256'); // You could change the algorithm to 'md5' or 'sha1' for other hashes
  hash.update(input);  // Update the hash with the input
  return hash.digest('hex');  // Return the hexadecimal string of the hash
}

const password = 'hafsa';
const hashedPassword = simpleHash(password);
console.log(' Password:', password);
console.log('Hashed Password:', hashedPassword);
