import BookQuery from '../model/BookQuery';

class APIQueryBuilder {

    constructor() {
        this.BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
        this.bookQuery = new BookQuery();
    }

    setQuery(bookQuery) {
        this.bookQuery = bookQuery;
    }

    callAPI() {
        return fetch(`${this.BASE_URL}${this.bookQuery.title}&intitle:${this.bookQuery.title}&orderBy:relevance&maxResults=40&key=AIzaSyAyxCsgKzQ3pLUUhl2YkozLi8UJQI55Vd4`, { method: 'GET' })
            .then(response => {
                return response.json();
            });
    }
}

export default APIQueryBuilder;