import React, { Component } from 'react';
import BookInfo from './BookInfo';

class Gallery extends Component {
    render() {
        let alternate = 'http://www.isic.cz/wp-content/plugins/orchitech-dm/resources/alive-dm/img/empty-image.png';

        return(
            <div>
                {
                    this.props.items.map((item, index) => {
                        let { title, imageUrl, readUrl } = item;
                        return (
                            <div className="book" key={index}>
                                <a href={readUrl} target="_blank">
                                    <img src={imageUrl !== '' ? imageUrl : alternate} className="book-img" alt="book"/>
                                    <div className="book-text">{title}</div>
                                </a>
                                <BookInfo book={item}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Gallery;
