import Book from '../model/Book';
import BookQuery from '../model/BookQuery';
import FilterQuery from '../model/FilterQuery';
import APIQueryBuilder from '../controller/APIQueryBuilder';
import Controller from '../controller/Controller';
import fetch from 'isomorphic-fetch';

describe('Filter Books', () => {

  let controller = Controller.getInstance();
  let bookQuery = new BookQuery();
  bookQuery.title = 'Harry Potter';
   
   it('Filter books by authors', () => {
        let filterQuery = new FilterQuery();
        let author = "Andrew Blake";
        filterQuery.authors = [author];
        controller.searchFor(bookQuery)
            .then(books => {
              let filtered = controller.filterBy(query);
              filtered.forEach(function (book) {
                expect(book.authors).toInclude(author);
              });
            });
   });

    it('Filter books by rate', () => {
       let filterQuery = new FilterQuery();
        let minRate = 2.0;
        filterQuery.minRate = minRate;
        controller.searchFor(bookQuery)
            .then(books => {
              let filtered = controller.filterBy(query);
              filtered.forEach(function (book) {
                expect(book.rate).toBeGreaterThanOrEqualTo(minRate);
              });
            });
    });

    it('Filter books by publishers', () => {
        let filterQuery = new FilterQuery();
        let publisher = "Rowman & Littlefield";
        filterQuery.publishers = [publisher];
        controller.searchFor(bookQuery)
            .then(books => {
              let filtered = controller.filterBy(query);
              filtered.forEach(function (book) {
                expect(book.publisherName).toBe(publisher);
              });
            });
    });

    it('Filter books by title', () => {
        let filterQuery = new FilterQuery();
        let title = "Baptizing Harry Potter";
        filterQuery.title = title;
        controller.searchFor(bookQuery)
            .then(books => {
              let filtered = controller.filterBy(query);
              filtered.forEach(function (book) {
                expect(book.title).toBe(title);
              });
            });
    });

    it('Filter books by publishers & authors & title & rate', () => {
        let filterQuery = new FilterQuery();
        filterQuery.title = "Harry Potter Power";
        filterQuery.authors = ["Julie-Anne Sykley"];
        filterQuery.publishers = ["Interactive Publications"];
        filterQuery.minRate = 3.0;
        controller.searchFor(bookQuery)
            .then(books => {
              let filtered = controller.filterBy(query);
              filtered.forEach(function (book) {
                expect(book.title).toBe("Harry Potter Power");
                expect(book.authors).toInclude("Julie-Anne Sykley");
                expect(book.publisherName).toBe("Interactive Publications");
                expect(book.rate).toBeGreaterThanOrEqualTo(3.0);
              });
            });
    });


});