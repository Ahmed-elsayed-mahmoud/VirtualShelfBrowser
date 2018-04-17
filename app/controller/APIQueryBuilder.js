import BookQuery from '../model/BookQuery';

class APIQueryBuilder {
    static BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

    constructor() {
        this.bookQuery = new BookQuery();
    }

    setQuery(bookQuery) {
        this.bookQuery = bookQuery;
    }

    callAPI() {
        let jsonResponse = null;
        fetch(`${APIQueryBuilder.BASE_URL}${this.bookQuery.title}`, { method: 'GET' })
            .then(response => jsonResponse = response.json());
        return jsonResponse;
    }
}

export default APIQueryBuilder;