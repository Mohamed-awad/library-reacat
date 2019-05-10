import React, {Component} from 'react';
import '../../App.css';
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            user:[],
        }
    }

    logout = () => {
        localStorage.removeItem("TOKEN");
        window.location = "http://localhost:3000/";
    };

    componentDidMount() {
        let token = localStorage.getItem("TOKEN");
        let user = JSON.parse(localStorage.getItem("USER"));

        this.setState({
            user,
        });
        if (!token) {
            window.location = "http://localhost:3000/";
        }else{
            if (user.isAdmin){
                window.location = "http://localhost:3000/AdminControl";
            }
        }
    }

    render() {
        let user = JSON.parse(localStorage.getItem("USER"));
        return (
            <div className='container-fluid navIBack '>
                <nav className="mb-1 navIBack navbar navbar-expand-lg navbar-dark orange lighten-1">
                    <a href='/' className="navbar-brand">
                        mktabty
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a href='/books' className="nav-link">
                                    my books
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href='/favourite/' className="nav-link">
                                    Favorites
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto nav-flex-icons moveAvata">

                            <li className="nav-item avatar">
                                <a className="nav-link p-0" href="#">
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
                                         className="rounded-circle z-depth-0" alt="avatar image" height="35"/>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link"
                                   href={`/user/${user.id}`}
                                >
                                    {user.name}
                                </a>
                            </li>
                            <li className="nav-item " width="25">
                                <button className='btn btn-primary'
                                        onClick={this.logout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

export default Nav;
