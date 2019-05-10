import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

import "../../App.css"
import axios from "axios";

class UrsLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.hundleLogin = this.hundleLogin.bind(this);
    }

    componentDidMount() {

        let token = localStorage.getItem("TOKEN");
        if (token) {
            window.location = "http://localhost:3000/books";
        }
    }

    handleUpdateEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handleUpdatePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    hundleLogin() {
        let isEmail = true;
        // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //
        // if (re.test(String(this.state.email).toLowerCase())) {
        //     isEmail = true;
        // }
        const NewUser = {
            'loginKeyword': this.state.email,
            'password': this.state.password,
            'isEmail': "true",
        };
        axios.post('http://127.0.0.1:8001/api/login/', NewUser)
            .then(res => {
                if (res.data.token) {
                    console.log(res.data.user);
                    localStorage.setItem("TOKEN", "Bearer " + res.data.token);
                    localStorage.setItem("USER", JSON.stringify(res.data.user));
                    if (res.data.user.isActive) {
                        if(res.data.user.isAdmin){
                            window.location = "http://localhost:3000/AdminControl";
                        }else{
                            window.location = "http://localhost:3000/books";
                        }
                    } else {
                        alert("sorry you are inactive")
                    }

                } else {
                    alert("invalid email or password");
                    window.location = "http://localhost:3000/";
                }
            }).catch((err)=>{
                console.log(err);
        });
    }

    render() {
        return (
            <div className='container-fluid '>
                <div className='row '>
                    <div className='col-lg-12 '>
                        <div className="logo">
                            <div className=" UsrLogin loginDivSize">
                                <FormGroup className=" UsrLogin mb-2 mr-sm-2 mb-sm-0">
                                    <Input className="loginInput"
                                           type="name" name="name"
                                           placeholder="User name"
                                           value={this.state.email}
                                           onChange={this.handleUpdateEmail}/>
                                </FormGroup>
                            </div>

                            <div className="UsrLogin loginDivSize">
                                <FormGroup className="UsrLogin  mb-2 mr-sm-2 mb-sm-0">
                                    <Input type="password" name="password"
                                           placeholder="Password"
                                           value={this.state.password}
                                           onChange={this.handleUpdatePassword}/>
                                </FormGroup>
                            </div>

                            <div className=" UsrLogin loginDivSize">
                                <Button className='btnMrgn'
                                        onClick={this.hundleLogin}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UrsLogin;
