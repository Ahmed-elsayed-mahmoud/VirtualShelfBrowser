import React, {Component} from 'react';
import {Row, Col, Badge, Button} from 'react-bootstrap';
import * as SweetAlert from 'sweetalert/dist/sweetalert.min';
import Controller from '../controller/Controller';
import BookQuery from '../model/BookQuery';
import User from '../model/User';
import Gallery from './Gallery';
import FilterPanel from './FilterPanel';
import {AdvancedSearch, GeneralSearch} from './SearchPanel';
import {SignComponent, SignInModal, SignUpModal} from './SignComponent';
import {Favourites} from './Favourites';

class Global extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advanced: false,
            searchID: 0,
            resultsCount: 0,
            items: [],
            user: null,
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

    setUser(user) {
        this.setState({user});
    }

    removeUser() {
        this.controller.signOut().then((status) => {
            if (status) {
                this.setState({user: null});
                swal("Successful", "Logged Out Successfully!", "success");
            }
            else {
                console.log("Log out failed");
                swal("Fail!", "Logged Out Failed!", "error");
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
                            this.state.user ?
                                <ul className="nav navbar-nav navbar-right">
                                    <Favourites books={[{title: "Harry Potter 1"}, {title: "Harry Potter 2"},
                                                        {title: "Harry Potter 3"}, {title: "Harry Potter 4"}]}/>
                                    <li className="link">
                                        <a onClick={() => this.removeUser()}>Log Out</a>
                                    </li>
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
                                    <span className="text-center" style={{marginTop: '50px'}}>
                                        Results <Badge>{this.state.items.length}</Badge>
                                    </span>
                                    <span className="text-center">
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
            </div>
        )
    }
}

export default Global;