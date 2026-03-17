const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    category: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;