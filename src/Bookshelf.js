import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from "./Book";

class Bookshelf extends Component {

    render() {
        const { name, books, onMoveBookShelf } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ name }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onMoveBookShelf={ onMoveBookShelf }
                                />
                            </li>
                        )) }
                    </ol>
                </div>
            </div>
        );
    }
}

Bookshelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array,
    onMoveBookShelf: PropTypes.func
}

export default Bookshelf;