import React, { Component } from 'react';
import { Row, Col, Badge, Form, FormGroup, FormControl, InputGroup, Glyphicon , Button } from 'react-bootstrap';

import Controller from '../controller/Controller';
import BookQuery from '../model/BookQuery';
import Gallery from './Gallery';
import FilterPanel from './FilterPanel';

class Global extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            ISBN: '',
            author: '',
            publisher: '',
            searchID: 0,
            resultsCount: 0,
            items: []
        };
        this.controller = Controller.getInstance();
    }

    search() {
        let bookQuery = new BookQuery();
        bookQuery.title = this.state.title;
        bookQuery.ISBN = this.state.ISBN;
        bookQuery.authorName = this.state.author;
        bookQuery.publisherName = this.state.publisher;
        this.controller.searchFor(bookQuery)
            .then(books => {
                console.log(books);
               this.setState({ items: books, searchID: this.state.searchID + 1, resultsCount: books.length});
            });
    }

    filter(query) {
        this.setState({
            items: this.controller.filterBy(query)
        });
    }

    render() {
        return (
            // we are using className instead of class as in html because class is a reserved word in JavaScript
            <div className="Global">
                <h2>Book Shelf Browser</h2>
                <Form inline>
                    <FormGroup>
                        <InputGroup style={{ margin: '2px' }}>
                            <InputGroup.Addon>Title</InputGroup.Addon>
                            <FormControl type="text"
                                         placeholder="Enter Book Title"
                                         onChange={event => this.setState({title: event.target.value})}
                                         onKeyPress={event => {
                                             if (event.key == 'Enter') {
                                                 this.search();
                                             }
                                         }}
                            />
                        </InputGroup>
                        <InputGroup style={{ margin: '2px' }}>
                            <InputGroup.Addon>Author</InputGroup.Addon>
                            <FormControl type="text"
                                         placeholder="Enter Book Author"
                                         onChange={event => this.setState({author: event.target.value})}
                                         onKeyPress={event => {
                                             if (event.key == 'Enter') {
                                                 this.search();
                                             }
                                         }}
                            />
                        </InputGroup>
                        <InputGroup style={{ margin: '2px' }}>
                            <InputGroup.Addon>ISBN</InputGroup.Addon>
                            <FormControl type="text"
                                         placeholder="Enter Book ISBN"
                                         onChange={event => this.setState({ISBN: event.target.value})}
                                         onKeyPress={event => {
                                             if (event.key == 'Enter') {
                                                 this.search();
                                             }
                                         }}
                            />
                        </InputGroup>
                        <InputGroup style={{ margin: '2px' }}>
                            <InputGroup.Addon>Publisher</InputGroup.Addon>
                            <FormControl type="text"
                                         placeholder="Enter Book Publisher"
                                         onChange={event => this.setState({publisher: event.target.value})}
                                         onKeyPress={event => {
                                             if (event.key == 'Enter') {
                                                 this.search();
                                             }
                                         }}
                            />
                        </InputGroup>
                        <Button onClick={() => this.search()} style={{ margin: '2px' }}>
                            <Glyphicon glyph="search"/> Search
                        </Button>
                    </FormGroup>
                </Form>
                <div className={this.state.resultsCount>0?"":"hidden"} style={{ marginTop: '10px' }}>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <Row>
                                <span className="pull-left" style={{ margin: '8px' }}>
                                    Results <Badge>{this.state.items.length}</Badge>
                                </span>
                                <span className="pull-right">
                                    <FilterPanel books={this.controller.filterBy()}
                                            filter={this.filter.bind(this)} searchID={this.state.searchID}/>
                                </span>
                            </Row>
                        </div>
                        <div className="panel-body">
                            <Gallery items={this.state.items}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Global;