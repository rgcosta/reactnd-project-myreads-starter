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
        BooksAPI.search('Art')
            .then((books) => console.log('query', books));
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

    moveBookShelf = (book, shelf) => {
        book.shelf = shelf;
        BooksAPI.update(book, shelf)
            .then((res) => {
                switch (shelf) {
                    case 'currentlyReading':
                        this.setState((prevState) => ({
                            booksReading: prevState.booksReading.concat([book]),
                            booksWant: prevState.booksWant.filter((b) => b.id !== book.id),
                            booksRead: prevState.booksRead.filter((b) => b.id !== book.id)
                        }));
                        break;
                    case 'wantToRead':
                        this.setState((prevState) => ({
                            booksWant: prevState.booksWant.concat([book]),
                            booksReading: prevState.booksReading.filter((b) => b.id !== book.id),
                            booksRead: prevState.booksRead.filter((b) => b.id !== book.id)
                        }));
                        break;
                    case 'read':
                        this.setState((prevState) => ({
                            booksRead: prevState.booksRead.concat([book]),
                            booksReading: prevState.booksReading.filter((b) => b.id !== book.id),
                            booksWant: prevState.booksWant.filter((b) => b.id !== book.id)
                        }));
                        break;
                }
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
                        <Bookshelf name='Currently Reading' books={this.state.booksReading} onMoveBookShelf={this.moveBookShelf}/>
                        <Bookshelf name='Want to Read' books={this.state.booksWant} onMoveBookShelf={this.moveBookShelf}/>
                        <Bookshelf name='Read' books={this.state.booksRead} onMoveBookShelf={ this.moveBookShelf }/>
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