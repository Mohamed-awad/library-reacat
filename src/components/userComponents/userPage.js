import React, {Component} from 'react';
import axios from "axios";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userId: this.props.match.params.id,
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("USER"));
        this.setState({user})
        console.log(this.props);
        axios.get('http://127.0.0.1:8001/api/users/' + this.state.userId)
            .then(res => {
                console.log(res.data.data);
                if (res.data) {
                    this.setState({
                        books: res.data.data,
                    });
                    console.log(this.state.books);
                } else {
                    alert("invalid email or password");
                }
            });
    }
    handleUpdateName = (event) => {
        console.log(event.target.value);
        let user = this.state.user;
        user.name = event.target.value
        this.setState({
            user,
        });
    };
    handleUpdateUserName = (event) => {
        console.log(event.target.value);
        let user = this.state.user;
        user.name = event.target.value
        this.setState({
            user,
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

    handelEdit = () => {

    };

    render() {
        return (
            <div>
                <table className='row mt-5 table-dark'>
                    <tr className='row mt-12'>
                        <td className='row mt-3'>
                            <h1>
                                name
                            </h1>
                        </td>
                        <td className='row mt-5'>
                            <h1>
                                {this.state.user.name}
                            </h1>
                        </td>
                    </tr>
                    <tr className='row mt-12'>
                        <td className='row mt-3'>
                            <h1>
                                name
                            </h1>
                        </td>
                        <td className='row mt-5'>
                            <h1>
                                {this.state.user.name}
                            </h1>
                        </td>
                    </tr>
                    <tr className='row mt-12'>
                        <td className='row mt-3'>
                            <h1>
                                name
                            </h1>
                        </td>
                        <td className='row mt-5'>
                            <h1>
                                {this.state.user.name}
                            </h1>
                        </td>
                    </tr>
                </table>
                <button
                    onClick={this.handelEdit}
                >
                    update
                </button>
            </div>

            // <div className='row mt-5'>
            //     <div className="row col-12">
            //         <div className="offset-1 col-4">
            //             <h1>
            //                 {this.state.user.name}
            //             </h1>
            //         </div>
            //         <div className="col-4">
            //             <h1>
            //                 {this.state.user.phone}
            //             </h1>
            //         </div>
            //     </div>
            //     <div className="col-12 row">
            //         <div className="col-4 offset-1">
            //             <h1>
            //                 {this.state.user.SSN}
            //             </h1>
            //         </div>
            //         <div className="col-4">
            //             <h1>
            //                 {this.state.user.email}
            //             </h1>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default UserPage;
