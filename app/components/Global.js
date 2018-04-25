import React, { Component } from 'react';
import { Row, Col, Badge, Button } from 'react-bootstrap';

import Controller from '../controller/Controller';
import BookQuery from '../model/BookQuery';
import Gallery from './Gallery';
import FilterPanel from './FilterPanel';
import { AdvancedSearch, GeneralSearch } from './SearchPanel';

class Global extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advanced: false,
            searchID: 0,
            resultsCount: 0,
            items: []
        };
        this.controller = Controller.getInstance();
    }

    search(bookQuery) {
        this.controller.searchFor(bookQuery)
            .then(books => {
                console.log(books);
               this.setState({
                   items: books,
                   searchID: this.state.searchID + 1,
                   resultsCount: books.length
                });
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
                {
                    this.state.advanced?
                    <AdvancedSearch search={q => this.search(q)} />
                    :
                    <GeneralSearch search={q => this.search(q)} />
                }
                <a href="#" onClick={()=> this.setState({advanced: !this.state.advanced})}>
                    {this.state.advanced? "general search" : "advanced search"}
                </a>
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