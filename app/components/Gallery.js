import React, { Component } from 'react';
import BookInfo from './BookInfo';

class Gallery extends Component {
    render() {
        let alternate = 'https://cdn0.iconfinder.com/data/icons/thin-photography/57/thin-367_photo_image_wall_unavailable_missing-512.png';

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
