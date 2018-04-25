import React, { Component } from 'react';
import { ControlLabel, Form, FormGroup, FormControl, InputGroup, Glyphicon , Button } from 'react-bootstrap';

import FilterQuery from '../model/FilterQuery';

class FilterMenuItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="form-check">
                <label className="form-check-label">
                    <input type="checkbox" className="form-check-input"
                            checked={this.props.checked} onChange={() => this.props.onChange()} />
                    {this.props.text}
                </label>
            </li>
        );
    }
}

class FilterMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let field = this.props.field;
        return (
            <div className="btn-group dropdown">
                    <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                    {this.props.title} <span className="caret"></span></button>
                <ul className="dropdown-menu scrollable-menu" role="menu">
                    {
                        Object.keys(this.props.items).map((key, index) =>{
                            let check = this.props.items[key];
                            return (
                                <FilterMenuItem onChange={()=> this.props.onChange(field,key,!check)}
                                            text={key} checked={check} key={`${field}${index}`}/>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

class FilterPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authors: [],
            publishers: [],
            filterQuery: new FilterQuery()
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.searchID === nextProps.searchID)
            return;

        let authorsSet = {};
        let publishersSet = new Set();
        let books = nextProps.books || [];

        books.forEach(book => {
            book.authors.forEach(author => {
                authorsSet[author] = false;
            });
            publishersSet[book.publisherName] = false;
        });

        this.setState({
            authors: authorsSet,
            publishers: publishersSet,
            filterQuery: new FilterQuery()
        });
    }

    onChange(field, text, checked) {
        if (checked) {
            this.state.filterQuery[field].add(text);
        } else {
            this.state.filterQuery[field].delete(text);
        }
        this.state[field][text] = checked;
        this.forceUpdate();
        this.props.filter(this.state.filterQuery);
    }

    minRate(rate) {
        this.state.filterQuery.minRate = rate || 0.0;
        this.forceUpdate();
        this.props.filter(this.state.filterQuery);
    }

    clear() {
        this.state.filterQuery = new FilterQuery();
        for (let key in this.state.authors) {
            this.state.authors[key] = false;
        }
        for (let key in this.state.publishers) {
            this.state.publishers[key] = false;
        }
        this.forceUpdate();
        this.props.filter(this.state.filterQuery);
    }

    render() {
        return (
            <Form inline>
                <FormGroup>
                    Filter by:
                    <FormGroup>
                        <FilterMenu title='Author' items={this.state.authors}
                                    field='authors' onChange={(f,t,c) => this.onChange(f,t,c)} />
                    </FormGroup>
                    <FormGroup>
                        <FilterMenu title='Publisher Name' items={this.state.publishers}
                                    field='publishers' onChange={(f,t,c) => this.onChange(f,t,c)} />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Min Rate</InputGroup.Addon>
                            <FormControl type="number" min="0" max="5" step="0.01" value={this.state.filterQuery.minRate}
                                         onChange={event => this.minRate(event.target.value)}
                                />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={() => this.clear()}>
                        <span className="glyphicon glyphicon-remove"></span> Clear
                        </Button>
                    </FormGroup>
                </FormGroup>
            </Form>
        );
    }
}

export default FilterPanel;