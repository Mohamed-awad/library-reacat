import React, {Component} from 'react';

import Link from "react-router-dom/es/Link";
import axios from "axios";


class FavorietBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.id,
            booksFav: [],
        };
    }

    componentDidMount() {
        // let cookies = new Cookies();
        // if (!cookies.get('token')) {
        //   window.location = "http://localhost:3000/";
        // }

        axios.get('http://127.0.0.1:8001/api/user/'+this.state.userId)
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    this.setState({
                        booksFav: res.data.data,
                    });
                } else {
                    alert("invalid email or password");
                }
            });
    }

    render() {
        return (
            <div className='row main'>
                {this.state.booksFav.map((book) =>
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
                                {book.NumberOfBook > 0 ?
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
                )};
            </div>

        );

    }
}

export default FavorietBooks;
