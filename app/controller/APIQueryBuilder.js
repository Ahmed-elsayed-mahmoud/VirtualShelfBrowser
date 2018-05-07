class APIQueryBuilder {

    constructor() {
        this.BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
        this.BASE_URL_REVIEWS = 'https://www.goodreads.com/book/isbn/';
        this.GOOGLE_KEY = 'AIzaSyAyxCsgKzQ3pLUUhl2YkozLi8UJQI55Vd4';
        this.GOODREADS_KEY = 'NwNSlVu7xFWbuomMXJhrzA';
    }

    callAPI(bookQuery) {
        let query = this.BASE_URL;
        if (typeof bookQuery === "string") { // general search
            if (bookQuery === '') {
                return new Promise(function (resolve, reject) {
                    resolve("");
                });
            }
            query += bookQuery.replace(/\s+/, "+");
        } else { // advanced search
            if (bookQuery.isEmpty()) {
                return new Promise(function (resolve, reject) {
                    resolve("");
                });
            }
            let separator = "";
            if (bookQuery.title !== '') {
                query += separator;
                query += 'intitle:' + bookQuery.title.replace(/\s+/, "+");
                separator = "+";
            }
            if (bookQuery.ISBN !== '') {
                query += separator;
                query += 'isbn:' + bookQuery.ISBN.replace(/\s+/, "+");
                separator = "+";
            }
            if (bookQuery.authorName !== '') {
                query += separator;
                query += 'inauthor:' + bookQuery.authorName.replace(/\s+/, "+");
                separator = "+";
            }
            if (bookQuery.publisherName !== '') {
                query += separator;
                query += 'inpublisher:' + bookQuery.publisherName.replace(/\s+/, "+");
                separator = "+";
            }
        }
        query = `${query}&orderBy:relevance&maxResults=40&key=${this.GOOGLE_KEY}`;
        //console.log(query);
        return fetch(query, {method: 'GET'})
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return new Promise(function (resolve, reject) {
                    resolve("");
                });
            });
    }

    callReviewsAPI(ISBN) {
        return fetch(`${this.BASE_URL_REVIEWS }${ISBN}?key=${this.GOODREADS_KEY}&format=json`, {method: 'GET'})
            .then(response => {
                return response.json();
            });
    }
}

export default APIQueryBuilder;