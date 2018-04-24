import APIQueryBuilder from './APIQueryBuilder';
import Book from "../model/Book";

class Controller {
    constructor() {
    	this.books = []; // list of books
        this.apiBuilder = new APIQueryBuilder();
    }

    searchFor(bookQuery) {
      	// return list of books
        return this.apiBuilder.callAPI(bookQuery)
            .then(json => {
                if (json === '') {
                    console.log("Controller: No Results");
                    this.books = [];
                    return this.books;
                }
                return this.parseResult(json);
            });
    }

    filterBy(bookQuery) {
        // return list of books
    }

    selectBook(ISBN) {
        // return book reviews
        return this.apiBuilder.callReviewsAPI(ISBN);
    }

    parseResult(json) {
    	// return list of books
        this.books = [];
        console.log(json);
        if (json.totalItems === 0) {
            return this.books;
        }
        let { items }  = json;
        items.forEach( item => {
            let book = new Book();
            let valid = false;
            book.title = item.volumeInfo.title;
            if (item.volumeInfo.industryIdentifiers !== undefined) {
                let identifiers = item.volumeInfo.industryIdentifiers;
                for (let i = 0; i < identifiers.length; ++i) {
                    if (identifiers[i].type === 'ISBN_10') {
                        book.ISBN = identifiers[i].identifier;
                        valid = true;
                        break;
                    }
                }
            }
            book.publisherName = item.volumeInfo.publisher;
            book.authors = item.volumeInfo.authors;
            book.description = item.volumeInfo.description;
            if (item.volumeInfo.imageLinks !== undefined) {
                book.imageUrl = item.volumeInfo.imageLinks.thumbnail;
            }
            book.numberOfPages = item.volumeInfo.pageCount;
            book.publicationDate = item.volumeInfo.publishedDate;
            book.readUrl = item.volumeInfo.infoLink;
            book.rate = (item.volumeInfo.averageRating !== undefined)?
                item.volumeInfo.averageRating : Math.round((3 + Math.random() * 2) * 10) / 10;
            if (valid) {
                this.books.push(book);
            }
        });
        return this.books;
    }

    addFavorite(book) {

    }

}

export default Controller;