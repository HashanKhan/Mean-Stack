const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: String,
    isbn: String,
    author: String,
    price: Number,
    year: String,
    publisher: String
});

const Book = mongoose.model('book', BookSchema);

//Data can be accessed from is if only we export this.
module.exports = Book;