const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    fname: String,
    lname: String,
    nationality: String
});

const Author = mongoose.model('author', AuthorSchema);

//Data can be accessed from is if only we export this.
module.exports = Author;