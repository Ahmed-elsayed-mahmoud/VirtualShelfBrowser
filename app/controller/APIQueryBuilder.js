import BookQuery from '../model/BookQuery';
import fetch from 'isomorphic-fetch';

class APIQueryBuilder {

    constructor() {
        this.BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
        this.BASE_URL_REVIEWS = 'https://www.goodreads.com/book/isbn/';
        this.bookQuery = new BookQuery();
    }

    setQuery(bookQuery) {
        this.bookQuery = bookQuery;
    }

    callAPI() {
        if (this.bookQuery.title === '') {
            console.log("API:No Search");
            return new Promise(function(resolve, reject) {
                resolve("");
            });
        }
        return fetch(`${this.BASE_URL}${this.bookQuery.title}&intitle:${this.bookQuery.title}&orderBy:relevance&maxResults=40&key=AIzaSyAyxCsgKzQ3pLUUhl2YkozLi8UJQI55Vd4`, { method: 'GET' })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return '';
            });
    }

    callReviewsAPI(ISBN) {
        let KEY = 'NwNSlVu7xFWbuomMXJhrzA';
        return fetch(`${this.BASE_URL_REVIEWS }${ISBN}?key=${KEY}&format=json`, { method: 'GET' })
            .then(response => {
                return response.json();
            });
    }
}

export default APIQueryBuilder;