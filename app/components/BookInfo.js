import React, { Component } from 'react';
import { Modal, Col, Row, Glyphicon, Button } from 'react-bootstrap';

class BookInfo extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
        show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        let alternate = 'https://cdn0.iconfinder.com/data/icons/thin-photography/57/thin-367_photo_image_wall_unavailable_missing-512.png';

        // let book = this.props.book;
        let book = {
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
        };

        return (
            <div>
                <Button bsStyle="info" bsSize="large" onClick={this.handleShow}>
                    Book Info
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{book.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} md={5}>
                                <img src={book.imageUrl ? book.imageUrl : alternate} className="img-responsive" alt="book cover"/>
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
                                    <div className="panel-body">{book.authors.join(", ")}</div>
                                </div>
                                <div className="panel panel-info">
                                    <div className="panel-heading">Description</div>
                                    <div className="panel-body">{book.description}</div>
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
