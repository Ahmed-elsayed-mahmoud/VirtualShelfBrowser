import Book from '../model/Book';
import BookQuery from '../model/BookQuery';
import APIQueryBuilder from '../controller/APIQueryBuilder';
import Controller from '../controller/Controller';
import React from 'react'


describe('API Query Builder', () => {

  let controller = new Controller();
   it('should return empty list', () => {

       let bookQuery = new BookQuery();
        bookQuery.title = '';
        controller.searchFor(bookQuery)
            .then(books => {
               expect(books.size).toBe(0);
            });
   });

    it('should return list of books', () => {

        let bookQuery = new BookQuery();
        bookQuery.title = 'Harry Potter';
        controller.searchFor(bookQuery)
            .then(books => {
               expect(books.size).not.toBe(0);
            });
    });

});