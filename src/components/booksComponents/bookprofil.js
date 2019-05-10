import React, {Component} from 'react';
import Bookcommnets from './bookComments'
import '../../Styles/bookprofile.css';

import axios from "axios";

class BookProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            currentBook: {},
            bookId: this.props.match.params.id,
            newReview: '',
            user: [],
            numOfDays: 0,
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("USER"));
        //current user
        this.setState({
            user,
        });
        const book = axios.get('http://127.0.0.1:8001/api/bookss/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            let currentBook = {...res.data.data, numOfDays: 1, isLeased: false};
            console.log(currentBook);
            if (res.data) {
                this.setState({
                    currentBook: currentBook,
                    comments: res.data.comments,
                });
            }
        });
        const myLeased = axios.get('http://127.0.0.1:8001/api/' + user.id + '/booklease', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            if (res.data) {
                this.setState({
                    myLeased: res.data.data,
                });
            }
        }).catch(err => {
        });

        Promise.all([book, myLeased])
            .then(() => {
                const myLeased = this.state.myLeased;
                const currentBook = this.state.currentBook;
                if (myLeased.length > 0) {
                    myLeased.map(leased => {
                        if (currentBook.id === leased.book_id) {
                            currentBook.isLeased = true;
                            this.setState({currentBook});
                        }
                    });
                }
            });
    }

    handle_update_review = (event) => {
        this.setState({
            newReview: event.target.value,
        });
    };

    handle_add_review = (bookId, userId) => {
        const newReview = {
            'body': this.state.newReview,
            'book_id': Number(bookId),
            'user_id': userId,
        };
        axios.post('http://127.0.0.1:8001/api/comments/' + bookId + '/' + userId, newReview, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            console.log(res);
            let comments = [...this.state.comments, res.data.data]
            this.setState({
                comments,
                newReview: '',
            });
        }).catch(err => {
            console.log(err);
        });
    };

    handelRemoveComment = (id) => {
        const comments = this.state.comments.filter(comment => {
            return comment.id != id
        });
        this.setState({comments});
        axios.delete('http://127.0.0.1:8001/api/comments/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
        }).catch(err => {
            console.log(err);
        });
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
        let currentBook = this.state.currentBook
        currentBook.isLeased = false
        this.setState({
            currentBook: currentBook,
        });


        axios.post('http://127.0.0.1:8001/api/booklease', NewLeased, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            console.log(res);

        });
        axios.put('http://127.0.0.1:8001/api/bookss/' + bookId, NewBook, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            console.log(res);
        })

    };
    handelNumOfDays = (e) => {
        let numOfDays = e.target.value;
        let currentBook = this.state.currentBook
        currentBook.numOfDays = numOfDays
        this.setState({currentBook});
    };

    render() {
        const comments = this.state.comments.map(comment =>
            <div className="row mt-2" key={comment.id}>
                <div className='btn-sm btn-dark offset-1 col-8 border-dark'>
                    {comment.body}
                </div>
                <div className="row col-2">
                    {comment.user_id == this.state.user.id ?
                        <button className="offset-1 col-11 btn btn-sm btn-primary"
                                onClick={() => this.handelRemoveComment(comment.id)}
                        >
                            delete
                        </button>
                        :
                        <br/>
                    }
                </div>
            </div>
        );
        return (
            <div className="container mb-2">
                <div className="row ">
                    <div className="col-4 row">
                        <div className="Img col-12">
                            <img
                                src={"http://localhost:8001/image/" + this.state.currentBook.image}
                                alt="book image"/>
                        </div>
                    </div>

                    <div className="offset-1 col-7">
                        <h4>
                            {this.state.currentBook.title}
                        </h4>
                        <p>
                            {this.state.currentBook.description}
                        </p>
                        <h4>
                            {this.state.currentBook.NumberOfBook} copy available
                        </h4>
                        <div>
                            {this.state.currentBook.isLeased ?
                                <div className=''>
                                    <h2>you leased it</h2>
                                </div>
                                : [
                                    (this.state.currentBook.NumberOfBook > 0 ?
                                            <div className='row'>
                                                <div className='row col-4 text-center align-middle'>
                                                    <button
                                                        className='  btn btn-sm btn-primary text-center col-12 align-middle'>
                                                        {this.state.currentBook.numOfDays * this.state.currentBook.leasePerDay}
                                                    </button>
                                                </div>
                                                <div className='row col-6  text-center align-middle'>
                                                    <input className='offset-1 col-11  text-center align-middle'
                                                           type='number'
                                                           value={this.state.currentBook.numOfDays}
                                                           min={1}
                                                           onChange={(e) => this.handelNumOfDays(e)}
                                                    />
                                                </div>
                                                <button className='mt-2 col-8 btn btn-sm btn-primary'
                                                        onClick={() => this.handelLeased(
                                                            this.state.currentBook.id,
                                                            this.state.user.id,
                                                            this.state.currentBook.numOfDays * this.state.currentBook.leasePerDay,
                                                            this.state.currentBook.title,
                                                            this.state.currentBook.category_id,
                                                            this.state.currentBook.description,
                                                            this.state.currentBook.author,
                                                            this.state.currentBook.NumberOfBook,
                                                            this.state.currentBook.leasePerDay)}
                                                >
                                                    lesead
                                                </button>
                                            </div>
                                            :
                                            <div>
                                                <h2>no book</h2>
                                            </div>
                                    ),
                                ]
                            }
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='row col-10'>
                        <textarea className='offset-2 col-10'
                                  cols='100'
                                  value={this.state.newReview}
                                  onChange={this.handle_update_review}
                        >
                        </textarea>
                    </div>
                    <div className='row col-2'>
                        <button className='offset-1 col-11 btn-sm btn-primary'
                                onClick={() => this.handle_add_review(this.state.bookId, this.state.user.id)}
                        >
                            done
                        </button>
                    </div>

                </div>
                {comments}
            </div>
        );
    }
};

export default BookProfile;
