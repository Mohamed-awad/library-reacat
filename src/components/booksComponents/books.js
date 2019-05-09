import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Categories from '../categoryComponents/categories';
import Search from './searchOrder'
import '../../Styles/main.css'
import GetCategories from "../../service/category/category";
import EditBook from "../../service/book/editBook";
import GetBooks from "../../service/book/book";

class BooksAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            bookShow: [],
            myFavorite: [],
            user: [],
        };
    }

    //show category
    handelShowCategory = (id) => {
        const bookShow = this.state.books.filter(book => {
            return book.category_id === id;
        });
        this.setState({bookShow});
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
                    return data.books;

                });
                let allbooks = []
                books.forEach(book => {
                    allbooks = [...allbooks, ...book]
                });
                let bookShow = allbooks.map(book => {
                    return {...book, isFavourite: false, numOfDays: 1};
                });
                if (res.data) {
                    this.setState({
                        categories: res.data,
                        bookShow,
                        books: bookShow,
                    });
                    console.log(this.state.categories);
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
        })
            .then(res => {
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

        Promise.all([myFavorite, allBook])
            .then(() => {
                const myFavorite = this.state.myFavorite;
                const bookShowState = this.state.bookShow;

                let bookShow = bookShowState.map(book => {
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

                bookShow = bookShow.map(book => {
                    return book[0];
                });
                this.setState({
                    bookShow,

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
        axios.put('http://127.0.0.1:8001/api/bookss'+bookId, NewBook, {
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


    render() {
        return (

            <div className='row'>

                <div className='col-2'>

                    <Categories
                        catego={this.state.categories}
                        onClick={this.handelShowCategory}
                    />
                </div>

                <div className='row col-10'>
                    <div className='row col-12'>
                        <Search
                            bookShow={this.state.bookShow}
                        />
                    </div>
                    <div className='col-12'>
                        {this.state.bookShow.map((book) =>
                            <div className="thumb offset-2 col-3" key={book.id}>
                                <div>
                                    <img style={{width: 200, height: 100}}
                                         src={"http://localhost:8001/" + book.image}
                                    />
                                    <div>
                                        <div className='text-center align-middle'>
                                            <Link to={'/books/' + book.id}>
                                                {book.title}
                                            </Link>
                                        </div>
                                        <div className='text-center align-middle'>
                                            {book.description}
                                        </div>
                                        <p className='text-center align-middle'>
                                            {book.NumberOfBook} copy available
                                        </p>
                                    </div>

                                    <div>
                                        <div className='row col-12'>
                                            {book.isFavourite ?
                                                <button className='col-12 btn btn-lg btn-primary'
                                                        onClick={() => this.addToFavorite(book.id, this.state.user.id, false)}
                                                >
                                                    un favourite
                                                </button>
                                                :
                                                <button className='col-12 btn btn-lg btn-dark'
                                                        onClick={() => this.addToFavorite(book.id, this.state.user.id, true)}
                                                >
                                                    favourite
                                                </button>
                                            }
                                        </div>
                                        {book.NumberOfBook > 0 ?
                                            <div className='col-12 row'>
                                                <div className="col-4">
                                                    <button>
                                                        {book.numOfDays * book.leasePerDay}
                                                    </button>
                                                </div>
                                                <div className="col-8">
                                                    <input type='number'
                                                           value={book.numOfDays}
                                                           min={1}
                                                           onChange={(e) => this.handelNumOfDays(e, book.id)}
                                                    />
                                                </div>
                                            </div> :
                                            <div>
                                                <h4>not avilaple for now </h4>
                                            </div>
                                        }
                                        <div className='col-12'>
                                            {book.NumberOfBook > 0 ?

                                                <button className='btn btn-lg btn-primary'
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
                                                :
                                                <p>no book</p>
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
