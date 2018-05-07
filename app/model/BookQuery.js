class BookQuery {
    constructor() {
        this.title = '';
        this.ISBN = '';
        this.publisherName = '';
        this.authorName = '';
        this.rate = 0.0;
    }

    isEmpty() {
        return (this.title === ''
            && this.ISBN === ''
            && this.authorName === ''
            && this.publisherName === '');
    }
}

export default BookQuery;