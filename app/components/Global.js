import React, {Component} from 'react';
import {Row, Col, Badge, Button} from 'react-bootstrap';

import Controller from '../controller/Controller';
import BookQuery from '../model/BookQuery';
import User from '../model/User';
import Gallery from './Gallery';
import FilterPanel from './FilterPanel';
import {AdvancedSearch, GeneralSearch} from './SearchPanel';
import {SignComponent, SignInModal, SignUpModal} from './SignComponent';
import {Favorites} from './Favorites';

class Global extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advanced: false,
            searchID: 0,
            resultsCount: 0,
            items: [],
            user: null,
            favourites: {}, // key: ISBN, value: Book object
        };
        this.controller = Controller.getInstance();
        this.setUser = this.setUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
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

    fetchFavorites() {
        this.controller.fetchCurrentUserFavorites()
            .then((favourites) => {
                let fav = {};
                favourites.forEach(book => {
                    fav[book.ISBN] = book;
                });
                this.setState({ favourites: fav });
            })
            .catch((error) => {
                this.setState({ favourites: {} });
            })
    }

    isFavorite(book) {
        return book.ISBN in this.state.favourites;
    }

    addToFavorites(book) {
        if (!this.state.user) {
            // Show error modal
            return;
        }
        // Add to local
        this.state.favourites[book.ISBN] = book;
        this.forceUpdate();
        // Add to remote and fetch other updates
        this.controller.addToFavorites(book)
            .then((added) => {
                this.fetchFavorites();
            })
            .catch(error => {
                // Show error modal
                // Remove from local
                delete this.state.favourites[book.ISBN];
                this.forceUpdate();
            });
    }

    removeFromFavorites(book) {
        if (!this.state.user) {
            // Show error modal
            return;
        }
        delete this.state.favourites[book.ISBN];
        this.forceUpdate();
        // Remove from remote and fetch other updates
        this.controller.removeFromFavorites(book)
            .then((removed) => {
                if (removed)
                    this.fetchFavorites();
            })
            .catch(error => {
                // Show error modal
                // Remove from local
                this.state.favourites[book.ISBN] = book;
                this.forceUpdate();
            });
    }

    setUser(user) {
        this.fetchFavorites();
        this.setState({ user });
    }

    removeUser() {
        this.controller.signOut().then((status) => {
            if (status) {
                this.setState({
                    user: null,
                    favourites: {},
                });
            }
            else {
                console.log("Log out failed");
            }
        });
    }

    render() {
        return (
            // we are using className instead of class as in html because class is a reserved word in JavaScript
            <div>
                <div className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="">Book Shelf Browser</a>
                        </div>
                        {
                            this.state.user?
                            <ul className="nav navbar-nav navbar-right">
                                <li className="link">
                                    <a onClick={() => this.removeUser()}>Log Out</a>
                                </li>
                                <Favorites
                                    books={Object.values(this.state.favourites)}
                                    addToFavorites={b => this.addToFavorites(b)}
                                    removeFromFavorites={b => this.removeFromFavorites(b)}
                                    isFavorite={b => this.isFavorite(b)}
                                />
                            </ul>
                            :
                            <SignComponent setUser={(user) => this.setUser(user)}/>
                        }
                    </div>
                </div>
                <div className="Global">
                    <h2>Book Shelf Browser</h2>
                    {
                        this.state.advanced ?
                            <AdvancedSearch search={q => this.search(q)}/>
                            :
                            <GeneralSearch search={q => this.search(q)}/>
                    }
                    <Button bsStyle="link" style={{marginTop: '-10px'}}
                            onClick={() => this.setState({advanced: !this.state.advanced})}>
                        {this.state.advanced ? "General Search" : "Advanced Search"}
                    </Button>
                    <div className={this.state.resultsCount > 0 ? "" : "hidden"} style={{marginTop: '10px'}}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <Row>
                                    <span className="pull-left" style={{margin: '8px'}}>
                                        Results <Badge>{this.state.items.length}</Badge>
                                    </span>
                                    <span className="pull-right">
                                        <FilterPanel books={this.controller.filterBy()}
                                                     filter={this.filter.bind(this)} searchID={this.state.searchID}/>
                                    </span>
                                </Row>
                            </div>
                            <div className="panel-body">
                                <Gallery
                                    items={this.state.items}
                                    addToFavorites={b => this.addToFavorites(b)}
                                    removeFromFavorites={b => this.removeFromFavorites(b)}
                                    isFavorite={b => this.isFavorite(b)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Global;