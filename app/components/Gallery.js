import React, {Component} from 'react';
import BookInfo from './BookInfo';

class Gallery extends Component {
    render() {
        //let alternate = 'http://www.isic.cz/wp-content/plugins/orchitech-dm/resources/alive-dm/img/empty-image.png';
        return (
            <div>
                {
                    this.props.items.map((item, index) => {
                        return (
                            <div className="book" key={index}>
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
