import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Gallery from './Gallery';

class Global extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            items: []
        }
    }

    search() {
        const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
        fetch(`${BASE_URL}${this.state.query}`, { method: 'GET' })
            .then(response => response.json())
            .then(json => {
                let { items }  = json;
                this.setState({ items });
            });
    }

    render() {
    	console.log(this.state.items);
        return (
            // we are using className instead of class as in html because class is a reserved word in JavaScript
            <div className="Global">
                <h2>Virtual Shelf</h2>
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