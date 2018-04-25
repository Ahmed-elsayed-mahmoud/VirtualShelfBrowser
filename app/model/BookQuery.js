
class BookQuery {
    constructor() {
        this.title = '';
        this.ISBN = '';
        this.publisherName = '';
        this.authorName = '';
        this.location = '';
        this.rate = 0.0;
        this.topRated = false;
        this.popularBooks = false;
    }

    isEmpty() {
        return this.title === ''
                && this.ISBN === ''
                && this.authorName === ''
                && this.publisherName === '';
    }
}

export default BookQuery;