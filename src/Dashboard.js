import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from "./Bookshelf";
import * as BooksAPI from './BooksAPI';

class Dashboard extends React.Component {

    state = {
        booksReading: [],
        booksWant: [],
        booksRead: []
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                console.log('books', books);
                this.setState({
                    booksReading: books.filter((b) => b.shelf === 'currentlyReading'),
                    booksWant: books.filter((b) => b.shelf === 'wantToRead'),
                    booksRead: books.filter((b) => b.shelf === 'read')
                });
            });
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf name='Currently Reading' books={this.state.booksReading}/>
                        <Bookshelf name='Want to Read' books={this.state.booksWant}/>
                        <Bookshelf name='Read' books={this.state.booksRead}/>
                    </div>
                </div>
                <div>
                    <Link to='/search' className="open-search" >Add a book</Link>
                </div>
            </div>
        );
    }
}

export default Dashboard;