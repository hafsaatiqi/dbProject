// backend/utils/helpers.js

const calculateFine = (dueDate, returnDate = new Date()) => {
    const overdueDays = Math.max(
      0,
      Math.ceil((new Date(returnDate) - new Date(dueDate)) / (1000 * 60 * 60 * 24))
    );
    const finePerDay = 10; // Customize this value
    return overdueDays * finePerDay;
  };
  
  module.exports = { calculateFine };
  