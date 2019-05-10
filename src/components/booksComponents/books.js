import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Categories from '../categoryComponents/categories';
import Search from './searchOrder'
import '../../Styles/main.css'
import GetCategories from "../../service/category/category";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import EditBook from "../../service/book/editBook";
import GetBooks from "../../service/book/book";

class BooksAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            bookShow: [],
            allBooks: [],
            myFavorite: [],
            myLeased: [],
            user: [],
            searchValue: '',
        };
    }

    //show category
    handelShowCategory = (id) => {
        if (id) {
            const bookShow = this.state.books.filter(book => {
                return book.category_id === id;
            });
            this.setState({bookShow});
        } else {
            const bookShow = this.state.books;
            this.setState({bookShow});
        }

    };


    componentDidMount() {
        let token = localStorage.getItem("TOKEN");
        let user = JSON.parse(localStorage.getItem("USER"));
        //current user
        this.setState({
            user,
        });
        if (!token) {
            window.location = "http://localhost:3000/";
        }


        //get all category
        const allBook = GetCategories()
            .then(res => {
                const books = res.data.map(data => {
                    let book = data.books.map(book => {
                        return book.data;
                    });
                    return book;

                });
                let allbooks = []
                books.forEach(book => {
                    allbooks = [...allbooks, ...book]
                });
                let bookShow = allbooks.map(book => {
                    return {...book, isFavourite: false, numOfDays: 1, isLeased: false};
                });
                if (res.data) {
                    this.setState({
                        categories: res.data,
                        bookShow,
                        books: bookShow,
                    });
                } else {
                    alert("invalid email or password");
                }
            }).catch(err => {
                console.log(err);
            });

        //get favorite book for user
        const myFavorite = axios.get('http://127.0.0.1:8001/api/' + user.id + '/favourites', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            if (res.data) {
                this.setState({
                    myFavorite: res.data.data,
                });
            } else {
                alert("invalid email or password");
            }
        }).catch(err => {
            console.log(err);
        });

        const myLeased = axios.get('http://127.0.0.1:8001/api/' + user.id + '/booklease', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            console.log(res);
            if (res.data) {
                this.setState({
                    myLeased: res.data.data,
                });
                console.log(this.state.myLeased);
            } else {
                alert("invalid email or password");
            }
        }).catch(err => {
            console.log(err);
        });

        Promise.all([myFavorite, allBook, myLeased])
            .then(() => {
                const myFavorite = this.state.myFavorite;
                const myLeased = this.state.myLeased;
                const bookShowState = this.state.bookShow;
                let bookShow = [];
                if (myFavorite.length > 0) {
                    bookShow = bookShowState.map(book => {
                        let mybook = myFavorite.map(fav => {
                            if (book.id === fav.id) {
                                book.isFavourite = true;
                                return book;
                            } else {
                                return book;
                            }
                        });
                        return mybook;
                    });
                } else {
                    bookShow = bookShowState;
                }
                let books = [];
                if (myLeased.length > 0) {
                    books = bookShow.map(book => {
                        let mybook = myLeased.map(leased => {
                            if (book.id === leased.book_id) {
                                book.isLeased = true;
                                return book;
                            } else {
                                return book;
                            }
                        });
                        return mybook;
                    });
                } else {
                    books = bookShow;
                }
                let allbooks = books.map(book => {
                    return book[0];
                });
                this.setState({
                    bookShow: allbooks,
                    books: allbooks,
                });
            });
    }

    addToFavorite = (id, userId, isFavorite) => {

        let bookShow = this.state.bookShow.map(book => {
            if (book.id === id) {
                if (isFavorite) {
                    book.isFavourite = true;
                    return book;
                } else {
                    book.isFavourite = false;
                    return book;
                }
            } else {
                return book
            }
        });
        this.setState(bookShow);

        if (isFavorite) {
            const NewFav = {
                'user_id': userId,
                'book_id': id,
            };
            axios.post('http://127.0.0.1:8001/api/' + userId + '/favourite/' + id, NewFav, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('TOKEN'),
                },
            }).then(res => {
                console.log(res);
            });
        } else {
            axios.delete('http://127.0.0.1:8001/api/' + userId + '/favourite/' + id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('TOKEN'),
                },
            }).then(res => {
                console.log(res);
            });
        }


    };
    handelNumOfDays = (e, id) => {
        let numOfDays = e.target.value;
        let bookShow = this.state.bookShow.map(book => {
            if (book.id === id) {
                book.numOfDays = numOfDays;
                return book;
            } else {
                return book
            }
        });
        this.setState(bookShow);
    };
    handelLeased = (bookId, userId, leased, title, catId, des, auth, num, leas) => {
        const NewLeased = {
            'user_id': userId,
            'book_id': bookId,
            'leased': leased,
        };
        const NewBook = {
            'title': title,
            'category_id': catId,
            'description': des,
            'author': auth,
            'NumberOfBook': num,
            'leasePerDay': leas,
        };
        let bookShow = this.state.bookShow.map(book => {
            if (book.id === bookId) {
                book.NumberOfBook = book.NumberOfBook - 1;
                return book;
            } else {
                return book;
            }
        });

        console.log(NewBook);
        console.log(NewLeased);
        axios.post('http://127.0.0.1:8001/api/booklease', NewLeased, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            console.log(res);
            this.setState({bookShow});
            console.log(this.state.bookShow);

        });
        axios.put('http://127.0.0.1:8001/api/bookss' + bookId, NewBook, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            console.log(res);
        })
        // EditBook(NewBook).then(data => {
        //     console.log(data);
        // });

    };
    handelArrangeRate = () => {
        const bookShow = this.state.bookShow.sort((a, b) =>
            (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0)
        );
        this.setState({bookShow});

    };
    handelArrangeLates = () => {
        console.log(this.state.bookShow);
        const bookShow = this.state.bookShow.sort((a, b) =>
            (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0)
        );
        this.setState({bookShow});
    };

    updateSearch = (event) => {
        this.setState({
            searchValue: event.target.value,
        })
    };
    searchForResult = () => {
        let value = this.state.searchValue;
        console.log(value);
        let bookShow = this.state.books.filter(book => {
            if (book.title === value || book.author === value) {
                return book
            }
        });
        this.setState({
            bookShow,
        });
        console.log(bookShow);
    };


    render() {
        return (

            <div className='row'>

                <div className='col-2'>

                    <Categories
                        catego={this.state.categories}
                        onClick={(e) => this.handelShowCategory(e)}
                    />
                </div>

                <div className='row col-10'>
                    <div className='row col-12'>
                        <div className='row col-12'>
                            <div className='col-4'>
                                <input className="btn btn-lg"
                                       type="text"
                                       placeholder="Search"
                                       aria-label="Search"
                                       onChange={this.updateSearch}
                                       value={this.state.searchValue}
                                />
                            </div>
                            <div className="col-2">
                                <button className=" btn btn-primary btn-lg"
                                        onClick={this.searchForResult}
                                >
                                    Search
                                </button>
                            </div>
                            <div className='offset-2 col-2'>
                                <button
                                    className=" btn btn-primary btn-lg"
                                    onClick={this.handelArrangeRate}
                                >
                                    Rate
                                </button>
                            </div>
                            <div className='col-2'>
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={this.handelArrangeLates}
                                >
                                    Latest
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 row'>
                        {this.state.bookShow.map((book) =>
                            <div className="thumb ml-5 col-2" key={book.id}>
                                <div className='row'>
                                    <img
                                        src={"http://localhost:8001/image/" + book.image}
                                    />
                                    <div className='row col-12'>
                                        <div className='text-center col-12 align-middle'>
                                            <Link to={'/books/' + book.id}>
                                                {book.title} <FontAwesomeIcon icon="stroopwafel"/>

                                            </Link>
                                        </div>
                                        <div className='text-center col-12 align-middle'>
                                            {book.description}
                                        </div>
                                        <p className='text-center col-12 align-middle'>
                                            {book.NumberOfBook} copy available
                                        </p>
                                    </div>

                                    <div className='row col-12'>
                                        <div className='row col-12'>
                                            {book.isFavourite ?
                                                <button className='col-12 btn btn-sm btn-primary'
                                                        onClick={() => this.addToFavorite(book.id, this.state.user.id, false)}
                                                >
                                                    un fav
                                                </button>
                                                :
                                                <button className='col-12 btn btn-sm btn-dark'
                                                        onClick={() => this.addToFavorite(book.id, this.state.user.id, true)}
                                                >
                                                    fav
                                                </button>
                                            }
                                        </div>
                                        <div className='row '>
                                            {book.isLeased ?
                                                <div className='text-center col-12 align-middle'>
                                                    <p>you leased it</p>
                                                </div>
                                                : [
                                                    (book.NumberOfBook > 0 ?
                                                            <div className='row'>
                                                                <div className='row col-4 text-center align-middle'>
                                                                    <button className='text-center col-12 align-middle'>
                                                                        {book.numOfDays * book.leasePerDay}
                                                                    </button>
                                                                </div>
                                                                <div className='row col-8  text-center align-middle'>
                                                                    <input
                                                                        className='offset-1 col-11  text-center align-middle'
                                                                        type='number'
                                                                        value={book.numOfDays}
                                                                        min={1}
                                                                        onChange={(e) => this.handelNumOfDays(e, book.id)}
                                                                    />
                                                                </div>
                                                                <div className="col-12 row">
                                                                    <button className='col-12 btn btn-sm btn-primary'
                                                                            onClick={() => this.handelLeased(book.id,
                                                                                this.state.user.id,
                                                                                book.numOfDays * book.leasePerDay,
                                                                                book.title,
                                                                                book.category_id,
                                                                                book.description,
                                                                                book.author,
                                                                                book.NumberOfBook,
                                                                                book.leasePerDay)}
                                                                    >
                                                                        lesead
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className='text-center col-12 align-middle'>
                                                                <span>no book</span>
                                                            </div>
                                                    ),
                                                ]
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default BooksAdmin;
