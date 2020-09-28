import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

    render() {
        const { book, onMoveBookShelf } = this.props;
        const {
            title,
            authors,
            imageLinks: {
                thumbnail
            }
        } = book;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select
                            value={book.shelf}
                            onChange={(e) => onMoveBookShelf(book, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value='read'>Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ title }</div>
                <div className="book-authors">{ authors[0] }</div>
            </div>
        );
    }
}

Book.propTypes = {
    book: PropTypes.object,
    onMoveBookShelf: PropTypes.func
}

export default Book;