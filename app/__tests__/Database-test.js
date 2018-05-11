import Book from '../model/Book';
import User from '../model/User';
import Controller from '../controller/Controller';

describe('Database tests', () => {

    let controller = Controller.getInstance();

    it('test add to favourites', () => {
        let user = new User();
        user.email = "mohamed.adel647@gmail.com";
        user.password = "123456";
        controller.signIn(user).then(function (status) {
            expect(status).toBe(true);
        });
        let book = new Book();
        book.ISBN = "1781100543";
        controller.addToFavorites(book).then(function (status) {
            expect(status).toBe(true);
        });
        controller.isFavorite(book).then(function (isFavourite) {
            expect(isFavourite).toBe(true);
        });
    });

    it('test get all favourites', () => {
        let user = new User();
        user.email = "mohamed.adel647@gmail.com";
        user.password = "123456";
        controller.signIn(user).then(function (status) {
            expect(status).toBe(true);
        });
        let book = new Book();
        book.ISBN = "1781100543";
        controller.fetchCurrentUserFavorites().then(function (favourites) {
            expect(favourites).toInclude(book);
        }).catch(function (error) {
            expect(true).not.toBe(true);
        });
    });

    it('test add already existing book', () => {
        let user = new User();
        user.email = "mohamed.adel647@gmail.com";
        user.password = "123456";
        controller.signIn(user).then(function (status) {
            expect(status).toBe(true);
        });
        let book = new Book();
        book.ISBN = "1781100543";
        controller.addToFavorites(book).then(function (status) {
            expect(status).toBe(true);
        });
        controller.isFavorite(book).then(function (isFavourite) {
            expect(isFavourite).toBe(true);
        })
    });

    it('test remove from favourites', () => {
        let user = new User();
        user.email = "mohamed.adel647@gmail.com";
        user.password = "123456";
        controller.signIn(user).then(function (status) {
            expect(status).toBe(true);
        });
        let book = new Book();
        book.ISBN = "1781100543";
        controller.removeFromFavorites(book).then(function (status) {
            expect(status).toBe(true);
        })
    });

    it('test add to favourites without login', () => {
        controller.signOut();
        let book = new Book();
        book.ISBN = "9770916080";
        controller.addToFavorites(book).then(function (status) {
            expect(true).not.toBe(true);
        }).catch(function (error) {
            expect(error.message).toBe("User must log in first");
        });
    });

});