import React, {Component} from 'react';
import '../../Styles/bookprofile.css';
import axios from "axios";

class Bookcommnets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            user: [],
            bookId: this.props.bookData
        };
    }

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
        axios.get('http://127.0.0.1:8001/api/books/' + this.state.bookId)
            .then(res => {
                if (res.data) {
                    console.log("-------------------------------");
                    console.log(res.data);
                    this.setState({
                        comments: res.data.data,
                    });
                } else {
                    alert("invalid email or password");
                }
            });
    }


    handelRemoveComment = (id, userId) => {
        console.log(id);
        axios.delete('http://127.0.0.1:8001/api/books/' + id + userId)
            .then(res => {
                const comments = this.state.comments.filter(comment => {
                    return comment.id != id
                });
                this.setState({
                    comments,
                });
            }).catch(err => {
            alert("invalid email or password");
        });
    };

    render() {
        return (
            <div className=' mt-5'>
                {this.state.comments.map((comment) =>
                    <div className="offset-1 row mt-2" key={comment.id}>
                        <div className='btn-lg btn-dark col-9 border-dark'>
                            {comment.body}
                        </div>
                        <div className="col-2">
                            {comment.id == this.state.user.is ?
                                <button className=" col-12 btn btn-lg btn-primary"
                                        onClick={() => this.handelRemoveComment(comment.id, this.state.user.id)}
                                >
                                    delete
                                </button>
                                :
                                <span></span>
                            }
                        </div>
                    </div>
                )};
            </div>
        );
    }
}

export default Bookcommnets;
