import React, {Component} from 'react';
import Bookcommnets from './bookComments'
import '../../Styles/bookprofile.css';

import axios from "axios";

class BookProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBook: '',
            bookId: this.props.match.params.id,
            author: '',
            category: '',
            reviews: [],
            newReview: '',
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8001/api/books/' + this.state.bookId)
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    console.log(res.data);
                    this.setState({
                        currentBook: res.data.data,
                    });
                    console.log(this.state.currentBook);
                } else {
                    alert("invalid email or password");
                }
            });
    }

    handle_update_review = (event) => {
        this.setState({
            newReview: event.target.value,
        });
    };


    handle_add_review = () => {
        const newReview = {
            'body': this.state.newReview,
            'book_id': Number(this.state.bookId),
            'user_id': 6,
        };
        console.log(newReview);
        axios.post('http://127.0.0.1:8001/api/comments/' + this.state.bookId, newReview)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row BookPage ">
                    <div className="col-2 BookImg">
                        <div className="Img">
                            <img style={{width: 150, height: 200}}
                                 src={"http://localhost:8001/" + this.state.currentBook.image}
                                 alt="Card image cap"/>
                        </div>
                    </div>

                    <div className="offset-1 mb-2">
                        <h1>
                            {this.state.currentBook.title}
                        </h1>
                        <p>
                            {this.state.currentBook.description}
                        </p>
                        <h4>
                            {this.state.currentBook.NumberOfBook} copy available
                        </h4>
                        <div>
                            {this.state.currentBook.NumberOfBook > 0 ?
                                <button className='btn btn-lg btn-primary'>
                                    Lease
                                </button>
                                :
                                <button className='btn btn-lg btn-dark'>
                                    Lease
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div className='row '>
                        <textarea className='offset-1 col-10'
                                  cols='100'
                                  value={this.state.newReview}
                                  onChange={this.handle_update_review}
                        >
                        </textarea>
                    </div>
                    <div className='row mt-3'>
                        <button className='offset-1 col-10 btn-lg btn-primary'
                                onClick={this.handle_add_review}
                        >
                            add Your Review
                        </button>
                    </div>

                </div>
                <Bookcommnets
                    bookData={this.state.bookId}
                    comments={this.state.currentBook}
                />
            </div>
        );
    }
};

export default BookProfile;
