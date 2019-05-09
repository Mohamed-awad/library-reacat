import React, {Component} from 'react';

import Link from "react-router-dom/es/Link";
import axios from "axios";


class FavorietBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            booksFav: [],
        };
    }

    componentDidMount() {
        // let cookies = new Cookies();
        // if (!cookies.get('token')) {
        //   window.location = "http://localhost:3000/";
        // }

        let token = localStorage.getItem("TOKEN");
        let user = JSON.parse(localStorage.getItem("USER"));
        //current user
        this.setState({
            user,
        });

        if (!token) {
            window.location = "http://localhost:3000/";
        }
        axios.get('http://127.0.0.1:8001/api/' + user.id + '/favourites', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            const books = res.data.data.map(book => {
                return book;

            });
            let booksFav = books.map(book => {
                return {...book, numOfDays: 1};
            });
            console.log(booksFav);
            if (res.data) {
                this.setState({
                    booksFav: booksFav,
                });
            } else {
                alert("invalid email or password");
            }
        }).catch(err => {
            console.log(err);
        });
    };

    addToFavorite = (id, userId) => {

        let booksFav = this.state.booksFav.filter(book => {
            return book.id != id;

        });
        console.log(booksFav);
        axios.delete('http://127.0.0.1:8001/api/' + userId + '/favourite/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            console.log(res);
            this.setState({
                booksFav,
            });

        });
    }

    handelNumOfDays = (e, id) => {
        let numOfDays = e.target.value;
        let booksFav = this.state.booksFav.map(book => {
            if (book.id === id) {
                book.numOfDays = numOfDays;
                return book;
            } else {
                return book
            }
        });
        this.setState(booksFav);
    };

    render() {
        return (
            <div className='col-12'>
                {this.state.booksFav.map((book) =>
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
                                    <button className='col-12 btn btn-lg btn-primary'
                                            onClick={() => this.addToFavorite(book.id, this.state.user.id)}
                                    >
                                        un favourite
                                    </button>

                                </div>
                                {book.NumberOfBook ?
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
                                        <h4>not available for now </h4>
                                    </div>
                                }
                                <div className='col-12'>
                                    {book.NumberOfBook > 0 ?

                                        <button className='btn btn-lg btn-primary'
                                                onClick={() => this.handelLeased(book.id, this.state.user.id, book.numOfDays * book.leasePerDay)}
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
        );

    }
}

export default FavorietBooks;
