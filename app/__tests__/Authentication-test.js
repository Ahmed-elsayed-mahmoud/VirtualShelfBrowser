import Book from '../model/Book';
import User from '../model/User';
import Controller from '../controller/Controller';


describe('Authentication tests', () => {

	let controller = Controller.getInstance();
   it('test signup', () => {

   		controller.signup(user);
       expect(book.title).toBe('Title');
   });

    it('should return publisher name', () => {

        expect(book.publisherName).toBe('Hamada');
    });

});