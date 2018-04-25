import React, { Component } from 'react';
import { Glyphicon , Button } from 'react-bootstrap';

import FilterQuery from '../model/FilterQuery';

class FilterMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        };
    }

    handleChange() {
        if (!this.state.checked) {
            this.props.add(this.props.text);
        } else {
            this.props.remove(this.props.text);
        }
        console.log("there");
        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        return (
            <li className="list-group-item">
                <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" onChange={()=>this.handleChange()}></input>
                    {this.props.text}
                </label>
            </li>
        );
    }
}

class FilterMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        };
    }

    add(text) {
        this.props.add(this.props.field, text);
    }

    remove(text) {
        this.props.remove(this.props.field, text);
    }

    render() {
        return (
            <div className="btn-group dropdown">
                    <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                    {this.props.title} <span className="caret"></span></button>
                <ul className="dropdown-menu scrollable-menu" role="menu">
                    {
                        this.props.items.map((item, index)=>{
                            return (
                                <FilterMenuItem add={(t)=>this.add(t)} remove={(t)=>remove(t)}
                                            text={item} key={`${this.props.field}${index}`}/>
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

        this.filterQuery = new FilterQuery();

        this.state = {
            authors: [],
            publishers: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.searchID === nextProps.searchID)
            return;

        let authorsSet = new Set();
        let publishersSet = new Set();
        let books = nextProps.books || [];

        books.forEach(book => {
            book.authors.forEach(author => {
                authorsSet.add(author);
            });
            publishersSet.add(book.publisherName);
        });

        this.filterQuery = new FilterQuery();

        this.setState({
            authors: [...authorsSet],
            publishers: [...publishersSet],
        });
    }

    add(field, text) {
        this.filterQuery[field].add(text);
        this.props.filter(this.filterQuery);
    }

    remove(field, text) {
        this.filterQuery[field].delete(text);
        this.props.filter(this.filterQuery);
    }

    minRate(rate) {
        this.filterQuery.minRate = rate || 0.0;
        this.props.filter(this.filterQuery);
    }

    render() {
        return (
            <form>
                Filter by:
                <span className="form-group">
                    <FilterMenu title='Author' items={this.state.authors}
                                field='authors' add={(f,t)=>this.add(f,t)} remove={(f,t)=>this.remove(f,t)} />
                    <FilterMenu title='Publisher Name' items={this.state.publishers}
                                field='publishers' add={(f,t)=>this.add(f,t)} remove={(f,t)=>this.remove(f,t)} />
                </span>
                <Button>
                    Clear <span className="glyphicon glyphicon-remove"></span>
                </Button>
            </form>
        );
    }
}

export default FilterPanel;