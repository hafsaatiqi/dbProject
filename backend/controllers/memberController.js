const Member = require('../models/members');

// Get all members
const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new member
const addMember = async (req, res) => {
  const newMember = new Member(req.body);
  try {
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a member
const updateMember = async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a member
const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Member deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMembers, addMember, updateMember, deleteMember };
