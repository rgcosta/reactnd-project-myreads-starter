import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

    state = {
        query: '',
        books: []
    }

    search = (e) => {
        const query = e.target.value.trim();
        if (query) {
            BooksAPI.search(query)
                .then((res) => {
                    const books = res.items || res;
                    const booksWithShelf = books.map((b) => {
                        const bRead = this.props.booksRead.find((bRead) => bRead.id === b.id);
                        const bReading = this.props.booksReading.find((bReading) => bReading.id === b.id);
                        const bWant = this.props.booksWant.find((bWant) => bWant.id === b.id);
                        // b.shelf = bRead?.shelf || bReading?.shelf || bWant?.shelf || 'none';
                        if (bRead) {
                            b.shelf = bRead.shelf;
                        } else if (bReading) {
                            b.shelf = bReading.shelf;
                        } else if (bWant) {
                            b.shelf = bWant.shelf;
                        } else {
                            b.shelf = 'none';
                        }
                        return b;
                    });
                    this.setState({
                        books: booksWithShelf
                    })
                });
        } else {
            this.setState({
                books: []
            })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            onChange={this.search}
                            type="text"
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <Bookshelf name='Results' books={this.state.books} onMoveBookShelf={this.props.onMoveBookShelf}/>
                </div>
            </div>
        );
    }
}

SearchBooks.propTypes = {
    booksReading: PropTypes.array,
    booksWant: PropTypes.array,
    booksRead: PropTypes.array,
    onMoveBookShelf: PropTypes.func
}

export default SearchBooks;