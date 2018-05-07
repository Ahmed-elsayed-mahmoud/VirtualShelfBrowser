import Review from '../model/Review';
import APIQueryBuilder from '../controller/APIQueryBuilder';
import Controller from '../controller/Controller';
import fetch from 'isomorphic-fetch';

describe('Reviews', () => {

    //let review = new Review();
    it('should return reviewer', () => {

        expect(review.reviewerName).toBe('Hamada');
    });

    it('should return rate', () => {

        expect(review.reviewRate).toBe(5.0);
    });

    let controller = Controller.getInstance();
    it('Fetch reviews using correct ISBN should return non empty response', () => {
        controller.selectBook("1576906388")
            .then(json => {
                expect(json["reviews_widget"]).not.toBe("");
            })
    });

    it('Fetch reviews using wrong ISBN should return error response', () => {
        controller.selectBook("1858465661")
            .catch(error => {
                expect(error).toBe("Page not found");
            });
    });
});

let review = {
    reviewerName: 'Hamada',
    reviewDate: '9/5/2018',
    reviewBody: 'review review',
    reviewRate: 5.0
}