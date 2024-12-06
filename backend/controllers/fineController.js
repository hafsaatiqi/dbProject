const Fine = require('../models/fines');

// Get all fines
/*const getFines = async (req, res) => {
  try {
    const fines = await Fine.find();
    res.status(200).json(fines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/

// Add a new fine
const addFine = async (req, res) => {
  const newFine = new Fine(req.body);
  try {
    const savedFine = await newFine.save();
    res.status(201).json(savedFine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a fine
const updateFine = async (req, res) => {
  try {
    const updatedFine = await Fine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedFine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a fine
const deleteFine = async (req, res) => {
  try {
    await Fine.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Fine deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFines = async (req, res) => {
  try {
    const memberId = req.user.id; // Assuming authentication middleware provides the member ID

    const fines = await Fine.find({ memberId })
      .populate('borrowingId', 'bookId dueDate returnDate')
      .populate('borrowingId.bookId', 'title');

    res.status(200).json(fines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { getFines, addFine, updateFine, deleteFine };
