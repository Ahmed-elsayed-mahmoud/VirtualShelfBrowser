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
        controller.fetchCurrentUserFavorites().then(function (favourites) {
            if (typeof favourites !== 'string') {
                expect(favourites).toInclude(book.ISBN);
            }
            else {
                expect(true).toBe(false);
            }
        })
    });

});