import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import Dashboard from './Dashboard';
import * as BooksAPI from "./BooksAPI";


class BooksApp extends React.Component {

  state = {
    booksReading: [],
    booksWant: [],
    booksRead: []
  };

  componentDidMount() {
    BooksAPI.getAll()
        .then((books) => this.setState({
            booksReading: books.filter((b) => b.shelf === 'currentlyReading'),
            booksWant: books.filter((b) => b.shelf === 'wantToRead'),
            booksRead: books.filter((b) => b.shelf === 'read')
        }));
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
            default:
                this.setState((prevState) => ({
                    booksRead: prevState.booksRead.filter((b) => b.id !== book.id),
                    booksReading: prevState.booksReading.filter((b) => b.id !== book.id),
                    booksWant: prevState.booksWant.filter((b) => b.id !== book.id)
                }));

          }
        });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
            <SearchBooks
                booksRead={this.state.booksRead}
                booksWant={this.state.booksWant}
                booksReading={this.state.booksReading}
                onMoveBookShelf={this.moveBookShelf}
            />
        )}/>
        <Route exact path='/' render={() => (
            <Dashboard
              booksRead={this.state.booksRead}
              booksWant={this.state.booksWant}
              booksReading={this.state.booksReading}
              onMoveBookShelf={this.moveBookShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
