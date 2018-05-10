import React, {Component} from 'react';
import {Modal, Col, Row, Glyphicon, Button} from 'react-bootstrap';
import Controller from '../controller/Controller';

class BookInfo extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleClose = this.handleClose.bind(this);
        this.controller = Controller.getInstance();

        this.state = {
            reviews: ''
        };
    }

    handleClose() {
        this.props.hide();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setState({reviews: ''});
            this.controller.selectBook(this.props.book.ISBN)
                .then(json => {
                    this.setState({reviews: json["reviews_widget"]});
                })
                .catch(error => {
                    this.setState({reviews: ''});
                });
        }
    }

    render() {
        let alternate = 'http://www.tpsudan.gov.sd/resources/files/images/placeholder.png';
        let book = this.props.book;

        return (
            <Modal show={this.props.show} onHide={this.handleClose} keyboard>
                <Modal.Header closeButton>
                    <a href={book.readUrl} target="_blank">
                        <Modal.Title>{book.title}</Modal.Title>
                    </a>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={5}>
                            <a href={book.readUrl} target="_blank">
                                <img src={book.imageUrl ? book.imageUrl : alternate} className="img-responsive"
                                     alt="book cover"/>
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
                                <div
                                    className="panel-body">{(book.authors !== undefined) ? book.authors.join(", ") : ""}</div>
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
        );
    }
}

export default BookInfo;
