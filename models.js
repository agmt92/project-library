const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define a schema that stores the book title, an array of comments, and a comment count.
const bookSchema = new Schema({
    title: { type: String, required: true },
    comments: [String],
    commentcount: { type: Number, default: 0 }
    });

// Create a model from the schema.

const Book = mongoose.model('Book', bookSchema);

const librarySchema = new Schema({
    name: { type: String, required: true },
    books: [bookSchema]
});

const Library = mongoose.model('Library', librarySchema);

console.log('Models loaded');

module.exports = Book;



