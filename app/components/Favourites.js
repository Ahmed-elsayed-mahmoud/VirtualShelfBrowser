import React, {Component} from 'react';
import BookInfo from './BookInfo';
import { Image, Row, Col } from 'react-bootstrap';

class FavouriteBook extends Component {
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
            <div>
                <a onClick={e => this.show()}>
                    <div className="row">
                        <div className="col-xs-4">
                            <img src={book.imageUrl ? book.imageUrl : alternate} className="img-thumbnail align-self-center"/>
                        </div>
                        <div className="col-xs-8"
                             style={{ minHeight: '80px', display: 'flex', flexFlow: 'column wrap', justifyContent: 'center' }}>
                            <span>{book.title}</span>
                        </div>
                    </div>
                </a>
                <BookInfo
                    book={this.props.book}
                    show={this.state.show}
                    hide={() => this.hide()}
                />
            </div>
        );
    }
}

class Favourites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            style: {
                width: "0",
            },
        }
    }

    show() {
        this.setState({show: true});
        this.setState({
            style: {
                width: "300px",
            }
        });
        document.getElementById("root").style.marginLeft = "200px";
    }

    hide() {
        this.setState({show: false});
        this.setState({
            style: {
                width: "0",
            }
        });
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
            <li className="link">
                <a onClick={e => this.handelClick()}>Favourites</a>
                <div className="sidenav" style={this.state.style}>
                    <div className="text-center" style={{ width: '260px', marginBottom: '15px' }}>
                        <h4>Favourites</h4>
                        <a className="closebtn" onClick={e => this.hide()}>&times;</a>
                    </div>
                    {
                        this.props.books.length === 0 ?
                            <a>You don't have favourites!</a>
                            :
                            this.props.books.map((book, i) => {
                                return (
                                    <FavouriteBook
                                        key={"favbook" + i}
                                        book={book}
                                    />
                                );
                            })
                    }
                </div>
            </li>
        );
    }
}

export {Favourites};