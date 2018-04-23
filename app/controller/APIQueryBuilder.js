import BookQuery from '../model/BookQuery';

class APIQueryBuilder {

    constructor() {
        this.BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
        this.BASE_URL_REVIEWS = 'https://www.goodreads.com/book/isbn/';
        this.GOOGLE_KEY = 'AIzaSyAyxCsgKzQ3pLUUhl2YkozLi8UJQI55Vd4';
        this.GOODREADS_KEY = 'NwNSlVu7xFWbuomMXJhrzA';
    }

    callAPI(bookQuery) {
        if (bookQuery.title === '') {
            console.log("API:No Search");
            return new Promise(function(resolve, reject) {
                resolve("");
            });
        }
        return fetch(`${this.BASE_URL}intitle:${bookQuery.title}&orderBy:relevance&maxResults=40&key=${this.GOOGLE_KEY}`, { method: 'GET' })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return '';
            });
    }

    callReviewsAPI(ISBN) {
        return fetch(`${this.BASE_URL_REVIEWS }${ISBN}?key=${this.GOODREADS_KEY}&format=json`, { method: 'GET' })
            .then(response => {
                return response.json();
            });
    }
}

export default APIQueryBuilder;