class FilterQuery {
    constructor() {
        this.title = '';
        this.ISBN = '';
        this.publishers = new Set();
        this.authors = new Set();
        this.minRate = 0.0;
    }

    isEmpty() {
        return (this.title === ''
            && this.ISBN === ''
            && this.authors.size === 0
            && this.publishers.size === 0
            && this.minRate === 0.0);
    }
}

export default FilterQuery;