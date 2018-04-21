import Review from './Review';

class Book {
    constructor() {
        this.title = '';
        this.ISBN = '';
        this.imageUrl = '';
        this.description = '';
        this.rate = 0.0;
        this.publisherName = '';
        this.publicationDate = '';
        this.numberOfPages = 0;
        this.readUrl = '';
        this.authors = [];
        this.storesLocations = [];
        this.reviews = [];
    }
}

export default Book;