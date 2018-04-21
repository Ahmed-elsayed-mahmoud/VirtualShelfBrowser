import Review from '../model/Review';

describe('Review', () => {

    //let review = new Review();
    it('should return reviewer', () => {

       expect(review.reviewerName).toBe('Hamada');
    });

    it('should return rate', () => {

        expect(review.reviewRate).toBe(5.0);
    });

});

let review = {
    reviewerName : 'Hamada',
    reviewDate : '9/5/2018',
    reviewBody : 'review review',
    reviewRate : 5.0
}