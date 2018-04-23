import React, { Component } from 'react';
import Controller from '../controller/Controller';
import BookQuery from '../model/BookQuery';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Gallery from './Gallery';

class Global extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            items: []
        };
        this.controller = new Controller();
    }

    search() {
        let bookQuery = new BookQuery();
        bookQuery.title = this.state.query;
        this.controller.searchFor(bookQuery)
            .then(books => {
               this.setState({ items: books });
            });
    }

    render() {
        return (
            // we are using className instead of class as in html because class is a reserved word in JavaScript
            <div className="Global">
                <h2>Book Shelf Browser</h2>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text"
                                     placeholder="Search for a book"
                                     onChange={event => this.setState({query: event.target.value})}
                                     onKeyPress={event => {
                                         if (event.key == 'Enter') {
                                             this.search();
                                         }
                                     }}
                        />
                        <InputGroup.Addon onClick={()=>this.search()}>
                            <Glyphicon glyph="search"/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <Gallery items={this.state.items}/>
            </div>
        )
    }
}

export default Global;