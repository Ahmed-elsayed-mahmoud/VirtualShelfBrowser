import APIQueryBuilder from './APIQueryBuilder';
import Book from "../model/Book";
import User from "../model/User";
import firebase from '../model/Firebase';

let _singleton = Symbol();

class Controller {

    // singletonToken to prevent creating instance using new
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');

        this.books = []; // list of books
        this.apiBuilder = new APIQueryBuilder();
        this.db = firebase.database();
        this.auth = firebase.auth();
    }

    static getInstance() {
        if(!this[_singleton]) {
            this[_singleton] = new Controller(_singleton);
        }

        return this[_singleton];
    }

    searchFor(bookQuery) {
      	// return list of books
        return this.apiBuilder.callAPI(bookQuery)
            .then(json => {
                if (json === '') {
                    //console.log("Controller: No Results");
                    this.books = [];
                    return this.books;
                }
                return this.parseResult(json);
            });
    }

    filterBy(filterQuery) {
        // return list of books
        if (!filterQuery || filterQuery.isEmpty()) {
            return this.books;
        }
        let filteredBooks = [];
        this.books.forEach(book => {
            if (book.title.includes(filterQuery.title)
                && book.ISBN.includes(filterQuery.ISBN)
                && book.rate >= filterQuery.minRate) {
                let authorFound = false;
                let publisherFound = false;

                if (filterQuery.authors.size !== 0) {
                    book.authors.forEach(author => {
                        if (filterQuery.authors.has(author)) {
                            authorFound = true;
                       }
                    });
                } else {
                    authorFound = true;
                }

                if (filterQuery.publishers.size !== 0) {
                    publisherFound = filterQuery.publishers.has(book.publisherName);
                } else {
                    publisherFound = true;
                }

                if (authorFound && publisherFound) {
                    filteredBooks.push(book);
                }
            }
        });
        return filteredBooks;
    }

    selectBook(ISBN) {
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
            book.publisherName = item.volumeInfo.publisher || '';
            book.authors = item.volumeInfo.authors || [];
            book.authors = book.authors.reduce((arr, author) => arr.concat(author.split(/\s*,\s*/)), []);
            book.description = item.volumeInfo.description || '';
            if (item.volumeInfo.imageLinks !== undefined) {
                book.imageUrl = item.volumeInfo.imageLinks.thumbnail;
            }
            book.numberOfPages = item.volumeInfo.pageCount;
            book.publicationDate = item.volumeInfo.publishedDate;
            book.readUrl = item.volumeInfo.infoLink || '';
            book.rate = (item.volumeInfo.averageRating !== undefined)?
                item.volumeInfo.averageRating : Math.round((3 + Math.random() * 2) * 10) / 10;
            if (valid) {
                this.books.push(book);
            }
        });
        return this.books;
    }

    addToFavorites(book) {
        let user = this.auth.currentUser;
        if (user) {
            let ref = this.db.ref('users/' + user.uid);
            let updates = {};
            updates[book.ISBN] = book;
            return ref.update(updates);
        }
    }

    removeFromFavorites(book){
        let user = this.auth.currentUser;
        if (user) {
            let ref = this.db.ref('users/' + user.uid);
            return ref.child(book.ISBN).remove();
        }
    }

    fetchCurrentUserFavorites(){
        let user = this.auth.currentUser;
        if (user) {
            let ref = this.db.ref('users/' + user.uid);
            let favorites = [];
            return ref.once('value').then(function(snapshot) {
                snapshot.forEach(function(f) {
                    favorites.push(f.val());
                });
                console.log(favorites);
            }).catch(function(error) {
              console.log("Fetch Favorites Fail: " + error.message);
            });
        }
    }

    isFavorite(book) {
        let user = this.auth.currentUser;
        if (user) {
            let ref = this.db.ref('users/' + user.uid);
            return ref.orderByChild("ISBN").equalTo(book.ISBN).once('value').then(function(favorites) {
                if (favorites.val()){
                  console.log("exists!");
                }
            }).catch(function(error) {
              console.log("Is Favorite Fail: " + error.message);
            });
        }
    }

    signIn(user) {
        return this.auth.signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
          console.log("SignIn Fail: " + error.message);
        });
    }

    signUp(user) {
        return this.auth.createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
          console.log("SignUp Fail: " + error.message);
        });
    }

    signOut() {
        return this.auth.signOut().then(function() {
          console.log("SignOut successful");
        }).catch(function(error) {
          console.log("SignOut Fail: " + error.message);
        });
    }
    
    getCurrentSignedUser(){
        // return a user
        // you can check if is loggedin by if(user)
        return this.auth.currentUser;
    }

    updateUserEmail(email) {
        let user = this.auth.currentUser;
        if(user){
            return user.updateEmail(email).then(function() {
              console.log("Update successful");
            }).catch(function(error) {
              console.log("Update Fail: " + error.message);
            });
        }
    }

}

export default Controller;