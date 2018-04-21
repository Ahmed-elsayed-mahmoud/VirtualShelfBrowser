import Book from '../model/Book';

describe('Book', () => {

   it('should return title', () => {

       expect(book.title).toBe('Title');
   });

    it('should return publisher name', () => {

        expect(book.publisherName).toBe('Hamada');
    });

});
let book = {
    title: 'Title',
    ISBN: '123asda123123',
    imageUrl: null,
    description: 'aasdas;ldkas;lkdl;asd\nklaldsadklasdjklasdaslkdklasjdklasjkldjklasdlk\nkladklas',
    rate: 0.0,
    publisherName: 'Hamada',
    publicationDate: '12/3/2019',
    numberOfPages: 0,
    readUrl: '',
    authors: ['Dr. Zizo', 'Prof. Adel'],
    storesLocations: ['ELPOP bookstore'],
    reviews: []
}