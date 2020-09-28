import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from "./Bookshelf";
import PropTypes from 'prop-types';

class Dashboard extends React.Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf
                            name='Currently Reading'
                            books={this.props.booksReading}
                            onMoveBookShelf={ this.props.onMoveBookShelf }/>
                        <Bookshelf
                            name='Want to Read'
                            books={this.props.booksWant}
                            onMoveBookShelf={ this.props.onMoveBookShelf }/>
                        <Bookshelf
                            name='Read'
                            books={this.props.booksRead}
                            onMoveBookShelf={ this.props.onMoveBookShelf }/>
                    </div>
                </div>
                <div>
                    <Link to='/search' className="open-search" >Add a book</Link>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    booksReading: PropTypes.array,
    booksWant: PropTypes.array,
    booksRead: PropTypes.array,
    onMoveBookShelf: PropTypes.func
}

export default Dashboard;