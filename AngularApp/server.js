'use strict';
const express = require('express'),bodyparser = require('body-parser'),mongoose = require('mongoose'),
        morgan = require('morgan'),Book = require('./public/scripts/models/book'),
                                    Author = require('./public/scripts/models/author');
const app = express();
const url = 'mongodb://localhost/Library';

mongoose.connect(url, function (err) {
    if (err) {
        console.log ('ERROR connecting to: ' + url + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + url);
    }
});

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(morgan('dev'));

app.get('/books', function (req, res) {
    Book.find({},function(err, users) {
        if (err) throw err;
        console.log(users);
        res.json(users);
    });
});

app.get('/authors', function (req, res) {
    Author.find({},function(err, authors) {
        if (err) throw err;
        console.log(authors);
        res.json(authors);
    });
});

app.post('/addbook', function (req, res) {
            const book = {
                name: req.body.name,
                isbn: req.body.isbn,
                author: req.body.author,
                price: req.body.price,
                year: req.body.year,
                publisher: req.body.publisher
            }
            const books = new Book(book);
            books.save(function (err, createdBook) {
                if (err) {
                    console.log('There\'s an error!!!');
                    res.send(err);
                }
                console.log(createdBook);
                res.send(createdBook);
            });
});

app.delete('/books/:id', function (req, res) {
    Book.findByIdAndRemove(req.params.id, req.body, function (err, book) {
        var id = req.params.id;
        console.log(id);
        if (err) {
            console.log('There\'s an error!!!');
            return(err);
        }
        console.log('Successfully Removed!');
        res.json(book);
    });
});

app.get('/books/:id', function (req, res) {
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, book) => {
            if (err){
                console.log('There\'s an error!!!');
                return res.status(500).send(err);
            }
            console.log('Successfully Edited!');
            return res.send(book);
        }
    )
});

app.listen(3000, function () {
    console.log('App listening on port 3000!!!')
});