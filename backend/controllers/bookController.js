const Book = require('../models/books');

// Get all books - everyone can access
const getBooks = async (req, res) => {
  try {
    const { title, author, category, minPrice, maxPrice } = req.query;

    // Build filter object dynamically
    let filter = {};

    // Search filter (if provided)
    if (title) {
      filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }
    if (author) {
      filter.author = { $regex: author, $options: 'i' }; // Case-insensitive search
    }
    if (category) {
      filter.category = { $regex: category, $options: 'i' }; // Case-insensitive search
    }

    // Query the database with filters
    const books = await Book.find(filter);

    // Send filtered books as a response
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new book
const addBook = async (req, res) => {
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getBooks, addBook, updateBook, deleteBook };
