import BookQuery from '../model/BookQuery';
import BookQuery from '../model/Book';
import APIQueryBuilder from './APIQueryBuilder';


class Controller {
    constructor() {
    	this.books = []; // list of books
        this.bookQuery = new BookQuery();
        this.apiBuilder = new APIQueryBuilder();
    }

    searchFor(bookQuery) {
      	// return list of books
    }

    filterBy(bookQuery) {
        // return list of books
    }

    selectBook(ISBN) {
        // return book
    }

    parseResult(json) {
    	// return list of books
    }

    addFavorite(book) {

    }

    updateViews() {

    }

}

export default Controller;