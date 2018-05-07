import Book from '../model/Book';
import BookQuery from '../model/BookQuery';
import APIQueryBuilder from '../controller/APIQueryBuilder';
import Controller from '../controller/Controller';
import fetch from 'isomorphic-fetch';

describe('General and Advanced Search', () => {

    let controller = Controller.getInstance();
    it('Empty title should return empty list', () => {

        let bookQuery = new BookQuery();
        bookQuery.title = '';
        controller.searchFor(bookQuery)
            .then(books => {
                expect(books.size).toBe(0);
            });
    });

    it('Non empty title should return list of books', () => {
        let bookQuery = new BookQuery();
        bookQuery.title = 'Harry Potter';
        controller.searchFor(bookQuery)
            .then(books => {
                expect(books.size).not.toBe(0);
            });
    });

    it('Non empty correct ISBN should return one book', () => {
        let bookQuery = new BookQuery();
        bookQuery.ISBN = "1781100543";
        controller.searchFor(bookQuery)
            .then(books => {
                expect(books.size).toBe(1);
            });
    });

    it('Non empty wrong ISBN should return empty list', () => {
        let bookQuery = new BookQuery();
        bookQuery.ISBN = "1234567890";
        controller.searchFor(bookQuery)
            .then(books => {
                expect(books.size).toBe(0);
            });
    });

    it('Non empty Query for a specific book should return one book', () => {
        let bookQuery = new BookQuery();
        bookQuery.title = "Harry Potter";
        bookQuery.authorName = "Sharon Moore";
        bookQuery.ISBN = "142997821X";
        bookQuery.rate = 4.5;
        controller.searchFor(bookQuery)
            .then(books => {
                expect(books.size).toBe(1);
                expect(book.publisherName).toBe("St. Martin's Griffin");
            });
    });


});