import React from 'react';
import axios from 'axios'


class UsrSignUp extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            Name: '',
            userName: '',
            email: '',
            password: '',
            Phone: '',
            Ssn: '',
        };
    }

    componentDidMount() {

    }

    handleUpdateName = (event) => {
        console.log(event.target.value);
        this.setState({
            Name: event.target.value
        });
    };
    handleUpdateUserName = (event) => {
        console.log(event.target.value);
        this.setState({
            userName: event.target.value
        });
    };
    handleUpdatePhone = (event) => {
        console.log(event.target.value);
        this.setState({
            Phone: event.target.value
        });
    };
    handleUpdateSsn = (event) => {
        console.log(event.target.value);
        this.setState({
            Ssn: event.target.value
        });
    };
    handleUpdateEmail = (event) => {
        console.log(event.target.value);
        this.setState({
            email: event.target.value
        });
    };
    handleUpdatePassword = (event) => {
        console.log(event.target.value);
        this.setState({
            password: event.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();
        const NewUser = {
            'name': this.state.Name,
            'userName': this.state.userName,
            'phone': this.state.Phone,
            'SSN': this.state.Ssn,
            'email': this.state.email,
            'password': this.state.password,
        };
        axios.post('http://127.0.0.1:8001/api/register/', NewUser)
            .then(res => {
                    console.log(res.data.token);
                    if (res.data.token) {
                        localStorage.setItem("TOKEN", res.data.token);
                        window.location = "http://localhost:3000/books";
                    } else {
                        alert("invalid email or password");
                        window.location = "http://localhost:3000/";
                    }
                }
            );
    };

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 '>
                        <h4>Dont Have an Account ? Create one</h4>
                        <hr/>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <input type="name"
                                       name="name"
                                       placeholder="Your name"
                                       value={this.state.Name} pattern='[A-Za-z\\s]*'
                                       onChange={this.handleUpdateName}/>
                            </div>
                            <div className='form-group'>
                                <input type="name"
                                       name="userName"
                                       placeholder="User name"
                                       value={this.state.userName} pattern='[A-Za-z\\s]*'
                                       onChange={this.handleUpdateUserName}/>
                            </div>
                            <div className='form-group'>
                                <input type="number"
                                       name="phone"
                                       placeholder="your phone please"
                                       value={this.state.phone}
                                       onChange={this.handleUpdatePhone}/>
                            </div>
                            <div className='form-group'>
                                <input type="number"
                                       name="ssn"
                                       placeholder="your ssn"
                                       value={this.state.Ssn}
                                       onChange={this.handleUpdateSsn}/>
                            </div>
                            <div className='form-group'>
                                <input type="email"
                                       name="email"
                                       placeholder="E-mail"
                                       value={this.state.email}
                                       onChange={this.handleUpdateEmail}/>
                            </div>
                            <div className='form-group'>
                                <input type="password"
                                       name="password"
                                       placeholder="password "
                                       value={this.state.password}
                                       onChange={this.handleUpdatePassword}/>
                            </div>
                            <button type='submit' className='btn btn-primary'> Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsrSignUp;
