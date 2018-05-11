import React, {Component} from 'react';
import {Glyphicon, ListGroupItem, ListGroup} from 'react-bootstrap';
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
                <a className="link" onClick={e => this.show()}><Glyphicon className="gold-star" glyph="star"/> {book.title}</a>
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
    }

    render() {
        let style = {};
        if (this.props.show) {
            style = { width: "250px"};
            document.getElementById("root").style.marginLeft = "260px";
        } else {
            style = { width: "0"};
            document.getElementById("root").style.marginLeft = "0";
        }
        return (
                <div>
                    <div className="sidenav" style={style}>
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
                </div>
        );
    }
}

export {Favorites};