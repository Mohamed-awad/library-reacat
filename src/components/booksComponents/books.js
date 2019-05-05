import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Categories from '../categoryComponents/categories';
import Search from './searchOrder'
import '../../Styles/main.css'

class BooksAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            bookShow: [],
            myFavorite: [],
            user: [],
            numOfDays: '',
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
        const allBook = axios.get('http://127.0.0.1:8001/api/categories/')
            .then(res => {
                const books = res.data.data.map(data => {
                    return data.books;

                });
                let allbooks = []
                books.forEach(book => {
                    allbooks = [...allbooks, ...book]
                });
                let bookShow = allbooks.map(book => {
                    return {...book, "isFavourite": false};
                });
                if (res.data) {
                    this.setState({
                        categories: res.data.data,
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
        const myFavorite = axios.get('http://127.0.0.1:8001/api/' + user.id + '/favourites')
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

        // const allBook =
        // axios.get('http://127.0.0.1:8001/api/books/')
        //     .then(res => {
        //         console.log(res.data);
        //         if (res.data) {
        //             let bookShow = res.data.map(book => {
        //                 book.isFavourite = false;
        //             });
        //             this.setState({
        //                 bookShow,
        //                 books: bookShow,
        //             });
        //         } else {
        //             alert("invalid email or password");
        //         }
        //     });

        Promise.all([myFavorite, allBook]).then((res) => {
            console.log(res);
            const myFavorite = this.state.myFavorite;
            const bookShowState = this.state.bookShow;
            console.log(myFavorite);
            console.log(bookShowState);
            let bookShow = bookShowState.map(book => {
                let mybook = myFavorite.map(fav => {
                    if (book.id === fav.id) {
                        console.log("=====");
                        book.isFavourite = true;
                        return book;
                    }else {
                        return book;
                    }
                })
                return mybook;
            });

            bookShow = bookShow.map(book=>{
                return book[0];
            });
            this.setState({
                bookShow,

            });
        });
    }

    addToFavorite = (id, userId, isFavorite) => {
        console.log(id + "  " + userId);
        //==========================================
        isFavorite = true;
        if (isFavorite) {
            axios.post('http://127.0.0.1:8001/api/' + userId + '/favourite/' + id)
                .then(res => {
                    if (res.data) {
                        console.log(res.data);
                    } else {
                        alert("invalid email or password");
                    }
                });
        } else {
            axios.delete('http://127.0.0.1:8001/api/' + userId + '/favourite/' + id)
                .then(res => {
                    if (res.data) {
                        console.log(res.data);
                    } else {
                        alert("invalid email or password");
                    }
                });
        }


    };
    handelNumOfDays = (e) => {
        let numOfDays = e.target.value;
        this.setState({numOfDays})
    };
    handelLeased = () => {

    };


    render() {
        return (

            <div>
                <Search
                    bookShow={this.state.bookShow}
                />

                <Categories
                    catego={this.state.categories}
                    onClick={this.handelShowCategory}
                />
                <div className='row main'>
                    {this.state.bookShow.map((book) =>
                        <div className="thumb offset-2 col-3" key={book.id}>
                            <div>
                                <img style={{width: 200, height: 100}}
                                     src={"http://localhost:8001/" + book.image}
                                />
                                <div>
                                    <div>
                                        <Link to={'/books/' + book.id}>
                                            {book.title}
                                        </Link>
                                    </div>
                                    <div>
                                        {book.description}
                                    </div>
                                    <p>
                                        {book.NumberOfBook} copy available
                                    </p>
                                </div>

                                <div>
                                    <div className='row col-12'>
                                        {book.isFavourite ?
                                            <button className='col-12 btn btn-lg btn-primary'
                                                    onClick={() => this.addToFavorite(book.id, this.state.user.id)}
                                            >
                                                un favourite
                                            </button>
                                            :
                                            <button className='col-12 btn btn-lg btn-dark'
                                                    onClick={() => this.addToFavorite(book.id, this.state.user.id)}
                                            >
                                                favourite
                                            </button>
                                        }
                                    </div>
                                    <div className='col-12'>
                                        <input type='number' value={this.state.numOfDays}
                                               onChange={this.handelNumOfDays}
                                        />
                                    </div>
                                    <div className='col-12'>
                                        <button className='btn btn-lg btn-primary'
                                                onClick={() => this.handelLeased(book.id, this.state.user.id)}
                                        >
                                            lesead
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BooksAdmin;
