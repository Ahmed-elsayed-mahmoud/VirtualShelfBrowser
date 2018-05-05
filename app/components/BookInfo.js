import React, { Component } from 'react';
import { Modal, Col, Row, Glyphicon, Button } from 'react-bootstrap';
import Controller from '../controller/Controller';

class BookInfo extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.controller = Controller.getInstance();

        this.state = {
            show: false,
            reviews: ''
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    /*getReviewsView(isbn) {
        this.BASE_URL = 'https://www.goodreads.com/book/isbn/'
        this.KEY = 'NwNSlVu7xFWbuomMXJhrzA';
        return fetch(`${this.BASE_URL}${isbn}?key=${this.KEY}&format=json`, { method: 'GET' })
            .then(response => {
                return response.json();
            });
    }*/

    handleShow() {
        this.setState({ show: true });
        this.controller.selectBook(this.props.book.ISBN)
            .then(json => {
                this.setState({ reviews: json["reviews_widget"]});
            })
            .catch(error => {
                this.setState({ reviews: '' });
            });
    }

    render() {
        let alternate = 'http://www.tpsudan.gov.sd/resources/files/images/placeholder.png';

        let book = this.props.book;
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
        };*/

        return (
            <div className="book-modal">
                <a onClick={this.handleShow}>
                    <img src={book.imageUrl !== '' ? book.imageUrl : alternate} className="book-img" alt="book"/>
                    <div className="book-text">{book.title}</div>
                </a>

                {/*<Button className="book-modal-btn" bsStyle="info" bsSize="large" onClick={this.handleShow}>
                    Book Info
                </Button>*/}

                <Modal show={this.state.show} onHide={this.handleClose} keyboard>
                    <Modal.Header closeButton>
                        <a href={book.readUrl} target="_blank">
                            <Modal.Title>{book.title}</Modal.Title>
                        </a>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} md={5}>
                                <a href={book.readUrl} target="_blank">
                                    <img src={book.imageUrl ? book.imageUrl : alternate} className="img-responsive" alt="book cover"/>
                                </a>
                                <div className="panel panel-warning">
                                    <div className="panel-heading">Rate: {book.rate}</div>
                                </div>
                                <div className="panel panel-info">
                                    <div className="panel-heading">ISBN</div>
                                    <div className="panel-body">{book.ISBN}</div>
                                </div>
                                <div className="panel panel-info">
                                    <div className="panel-heading">Publication Date</div>
                                    <div className="panel-body">{book.publicationDate}</div>
                                </div>
                                <div className="panel panel-info">
                                    <div className="panel-heading">Published by</div>
                                    <div className="panel-body">{book.publisherName}</div>
                                </div>
                            </Col>
                            <Col xs={12} md={7}>
                                <div className="panel panel-info">
                                    <div className="panel-heading">Authors</div>
                                    <div className="panel-body">{(book.authors !== undefined)? book.authors.join(", ") : ""}</div>
                                </div>
                                <div className="panel panel-info">
                                    <div className="panel-heading">Description</div>
                                    <div className="panel-body">{book.description}</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="container" dangerouslySetInnerHTML={{__html: this.state.reviews}}>
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default BookInfo;
