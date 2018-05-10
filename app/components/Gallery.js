import React, {Component} from 'react';
import BookInfo from './BookInfo';

class BookItem extends Component {
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
            <div className="book-modal">
                <a onClick={e => this.show()}>
                    <img src={book.imageUrl !== '' ? book.imageUrl : alternate} className="book-img" alt="book"/>
                    <div className="book-text">{book.title}</div>
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

class Gallery extends Component {
    render() {
        return (
            <div>
                {
                    this.props.items.map((item, index) => {
                        return (
                            <div className="book" key={index}>
                                <BookItem book={item}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Gallery;
