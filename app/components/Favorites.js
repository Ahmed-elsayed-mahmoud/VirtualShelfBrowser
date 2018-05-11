import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import BookInfo from './BookInfo';

class FavoriteBook extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
        };
    }

    show() {
        this.setState({show: true});
    }

    hide() {
        this.setState({show: false});
    }

    render() {
        let book = this.props.book;

        return (
            <div>
                <a onClick={e => this.show()}>
                    {book.title}
                </a>
                <BookInfo
                    book={this.props.book}
                    show={this.state.show}
                    hide={() => this.hide()}

                    addToFavorites={b => this.props.addToFavorites(b)}
                    removeFromFavorites={b => this.props.removeFromFavorites(b)}
                    isFavorite={b => this.props.isFavorite(b)}
                />
            </div>
        );
    }
}

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            style:{
                width: "0",
            },
        }
    }

    show() {
        this.setState({show: true});
        this.setState({
            style: {
                width: "250px",
            }
        })
        document.getElementById("root").style.marginLeft = "250px";
    }

    hide() {
        this.setState({show: false});
        this.setState({
            style: {
                width: "0",
            }
        })
        document.getElementById("root").style.marginLeft = "0";
    }

    handelClick() {
        if (!this.state.show) {
            this.show();
        } else {
            this.hide();
        }
    }

    render() {
        return (
                <li>
                    <a className="link" onClick={e => this.handelClick()}>Favorites</a>
                    <div className="sidenav" style={this.state.style}>
                        <h4 style={{color:"#f1f1f1"}}>Favorites</h4>
                        {
                            this.props.books.length == 0?
                            <a>You don't have Favorites!</a>
                            :
                            this.props.books.map((book, i) => {
                                return (
                                    <FavoriteBook
                                        key={"favbook"+i}
                                        book={book}

                                        addToFavorites={b => this.props.addToFavorites(b)}
                                        removeFromFavorites={b => this.props.removeFromFavorites(b)}
                                        isFavorite={b => this.props.isFavorite(b)}
                                    />
                                );
                            })
                        }
                    </div>
                </li>
        );
    }
}

export {Favorites};