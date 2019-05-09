import React, {Component} from 'react';
import Bookcommnets from './bookComments'
import '../../Styles/bookprofile.css';

import axios from "axios";

class BookProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            bookId: this.props.match.params.id,
            newReview: '',
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("USER"));
        //current user
        this.setState({
            user,
        });
        axios.get('http://127.0.0.1:8001/api/bookss/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('TOKEN'),
            },
        }).then(res => {
            if (res.data) {
                this.setState({
                    comments: res.data.data,
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

    render() {
        const comments = this.state.comments.map(comment =>
            <div className="offset-1 row mt-2" key={comment.id}>
                <div className='btn-lg btn-dark col-9 border-dark'>
                    {comment.body}
                </div>
                <div className="col-2">
                    {comment.user_id == this.state.user.id ?
                        <button className=" col-12 btn btn-lg btn-primary"
                                onClick={() => this.handelRemoveComment(comment.id)}
                        >
                            delete
                        </button>
                        :
                        <span></span>
                    }
                </div>
            </div>
        )
        return (
            <div className="container-fluid">
                <div className="row BookPage ">
                    <div className="col-2 BookImg">
                        <div className="Img">
                            <img style={{width: 150, height: 200}}
                                 src={"http://localhost:8001/" + this.state.comments.image}
                                 alt="Card image cap"/>
                        </div>
                    </div>

                    <div className="offset-1 mb-2">
                        <h1>
                            {this.state.comments.title}
                        </h1>
                        <p>
                            {this.state.comments.description}
                        </p>
                        <h4>
                            {this.state.comments.NumberOfBook} copy available
                        </h4>
                        <div>
                            {this.state.comments.NumberOfBook > 0 ?
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
                                onClick={() => this.handle_add_review(this.state.bookId, this.state.user.id)}
                        >
                            add Your Review
                        </button>
                    </div>

                </div>
                {comments}
                {/*<Bookcommnets*/}
                {/*bookData={this.state.bookId}*/}
                {/*comments={this.state.comments}*/}
                {/*/>*/}
            </div>
        );
    }
};

export default BookProfile;
