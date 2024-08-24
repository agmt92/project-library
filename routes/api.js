'use strict';

const express = require('express');
const json = require("body-parser/lib/types/json");
const { response } = require("../server");

module.exports = function (app) {
  let books = [];

  app
  .route('/api/books/')
    .get( async (req, res) => {
      //response will be array of book objects
      let book = books.map(book => {
        return {
          _id: book._id,
          title: book.title,
          commentcount: book.commentcount
        };
      }
      );
      res.json(book);
    })

    
    .post(async (req, res) => {
      const library = req.params.library;
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.json({ error: 'missing title' });
        return;
      }

      let newBook = {
        _id: books.length + 1,
        title: title,
        comments: [],
        commentcount: 0
      };

      books.push(newBook);
      res.json(newBook);
    })
    
    .delete( async (req, res) => {
      //if successful response will be 'complete delete successful'
      books = [];
      res.json('complete delete successfull');
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let bookid = req.params.id;
      let book = books.find(book => book._id == bookid);
      if (!book) {
        res.json({ error: 'no book exists' });
        return;
      }
      res.json(book);
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        res.json({ error: 'missing comment' });
        return;
      }
      let book = books.find(book => book._id == bookid);
      if (!book) {
        res.json({ error: 'no book exists' });
        return;
      }
      book.comments.push(comment);
      book.commentcount = book.comments.length;
      res.json(book);
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      
      if(!books.find(book => book._id == bookid)) {
        res.json({ error: 'no book exists' });
        return;
      }
      books = books.filter(book => book._id != bookid);
      res.json('delete successful');
    });
  
};
