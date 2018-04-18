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
        }
    }

    search() {
        /*const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
        fetch(`${BASE_URL}${this.state.query}&intitle:${this.state.query}&orderBy:relevance&maxResults=40&key=AIzaSyAyxCsgKzQ3pLUUhl2YkozLi8UJQI55Vd4`, { method: 'GET' })
            .then(response => response.json())
            .then(json => {
                let { items }  = json;
                this.setState({ items });
            });*/
        let controller = new Controller();
        let bookQuery = new BookQuery();
        bookQuery.title = this.state.query;
        controller.searchFor(bookQuery)
            .then(books => {
               this.setState({ items: books });
            });
        /*let book = {
            title: 'the title',
            ISBN: '123asda123123',
            imageUrl: null,
            description: 'aasdas;ldkas;lkdl;asd\nklaldsadklasdjklasdaslkdklasjdklasjkldjklasdlk\nkladklas',
            rate: 0.0,
            publisherName: 'Hamada El LOL',
            publicationDate: '12/3/2019',
            numberOfPages: 0,
            readUrl: '',
            authors: ['Dr. Zizo', 'Prof. Adel'],
            storesLocations: ['ELPOP bookstore'],
            reviews: []
        };
        let items = [book, book, book, book, book, book, book, book];
        this.setState({ items });*/
    }

    render() {
    	console.log(this.state.items);
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