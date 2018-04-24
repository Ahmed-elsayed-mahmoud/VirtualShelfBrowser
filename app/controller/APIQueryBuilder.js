
class APIQueryBuilder {

    constructor() {
        this.BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
        this.BASE_URL_REVIEWS = 'https://www.goodreads.com/book/isbn/';
        this.GOOGLE_KEY = 'AIzaSyAyxCsgKzQ3pLUUhl2YkozLi8UJQI55Vd4';
        this.GOODREADS_KEY = 'NwNSlVu7xFWbuomMXJhrzA';
    }

    callAPI(bookQuery) {
        if (bookQuery.title === '' && bookQuery.ISBN === ''
            && bookQuery.authorName === '' && bookQuery.publisherName === '') {
            return new Promise(function(resolve, reject) {
                resolve("");
            });
        }
        let query = `${this.BASE_URL}${bookQuery.title}`;
        let addedParameters = false;
        if (bookQuery.title !== '') {
            addedParameters = true;
        }
        if (bookQuery.ISBN !== '') {
            if (addedParameters) {
                query += '+';
            }
            query += 'isbn:' + bookQuery.ISBN;
            addedParameters = true;
        }
        if (bookQuery.authorName !== '') {
            if (addedParameters) {
                query += '+';
            }
            query += 'inauthor:' + bookQuery.authorName;
            addedParameters = true;
        }
        if (bookQuery.publisherName !== '') {
            if (addedParameters) {
                query += '+';
            }
            query += 'inpublisher:' + bookQuery.publisherName;
            addedParameters = true;
        }
        query = `${query}&orderBy:relevance&maxResults=40&key=${this.GOOGLE_KEY}`;
        console.log(query);
        return fetch(query, { method: 'GET' })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return new Promise(function(resolve, reject) {
                    resolve("");
                });
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