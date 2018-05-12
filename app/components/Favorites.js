import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {RotateLoader} from 'react-spinners';
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
        let alternate = 'http://www.tpsudan.gov.sd/resources/files/images/placeholder.png';
        let book = this.props.book;

        return (
            <div className="link">
                <a onClick={e => this.show()}>
                    <div className="row">
                        <div className="col-xs-4">
                            <img src={book.imageUrl ? book.imageUrl : alternate}
                                 className="img-thumbnail align-self-center"/>
                        </div>
                        <div className="col-xs-8"
                             style={{
                                 minHeight: '80px',
                                 display: 'flex',
                                 flexFlow: 'column wrap',
                                 justifyContent: 'center'
                             }}>
                            <span>{book.title}</span>
                        </div>
                    </div>
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
    }

    render() {
        let style = {};
        if (this.props.show) {
            style = {width: "250px"};
            document.getElementById("root").style.marginLeft = "200px";
        } else {
            style = {width: "0"};
            document.getElementById("root").style.marginLeft = "0";
        }
        return (
            <div className="sidenav" style={style}>
                <div className="text-center" style={{width: '250px', marginBottom: '15px'}}>
                    <h4><Glyphicon className="gold-star" glyph="star" style={{fontSize: '20px'}}/> Favorites</h4>
                    <a className="closebtn" onClick={e => this.props.hide()}>
                        <Glyphicon glyph="remove" style={{fontSize: '17px'}}/>
                    </a>
                    <a className="reloadbtn" onClick={e => this.props.fetchFavorites()}>
                        <Glyphicon glyph="repeat" style={{fontSize: '15px', fontWeight: 'bold'}}/>
                    </a>
                </div>
                {
                    this.props.books.length === 0 ?
                        this.props.isLoading ?
                            <div className="text-center" style={{margin: '50px'}}>
                                <RotateLoader loading={this.props.isLoading} color={'#000'}/>
                            </div>
                            :
                            <a className="text-center">You don't have favourites!</a>
                        :
                        this.props.books.map((book, i) => {
                            return (
                                <FavoriteBook
                                    key={"favbook" + book.ISBN}
                                    book={book}

                                    addToFavorites={b => this.props.addToFavorites(b)}
                                    removeFromFavorites={b => this.props.removeFromFavorites(b)}
                                    isFavorite={b => this.props.isFavorite(b)}
                                />
                            );
                        })
                }
            </div>
        );
    }
}

export {Favorites};