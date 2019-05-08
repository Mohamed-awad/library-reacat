import React, {Component} from 'react';
import axios from "axios";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userId: this.props.match.params.id,
        };
        this.handle_modal = this.handle_modal.bind(this);
        this.handling_modal = this.handling_modal.bind(this);
    }
    handle_modal(){}
    handling_modal(){}

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("USER"));
        this.setState({user})
        axios.get('http://127.0.0.1:8001/api/users/' + this.state.userId)
            .then(res => {
                console.log(res.data.data);
                if (res.data) {
                    this.setState({
                        user: res.data.data,
                    });
                    console.log(this.state.user);
                } else {
                    alert("invalid email or password");
                }
            }).catch(err => {
            console.log(err);
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
            <div className='container'>
                <Modal isOpen={this.state.modal} toggle={this.handle_modal} className={this.props.className}>
                    <ModalHeader toggle={this.handle_modal}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">name</Label>
                                <Input type="name" name="name" id="name"
                                       placeholder="Book name" value={this.state.user.name}
                                       onChange={this.handle_updateBook}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">user phone</Label>
                                <Input type="select" name="select" id="exampleSelect"
                                       onChange={this.handle_updateBook}
                                       value={this.state.user.name}
                                >

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">user ssn</Label>
                                <Input type="select" name="select1" id="exampleSelect"
                                       onChange={this.handle_updateBook}
                                       value={this.state.user.name}
                                >
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Upload Image</Label>
                                <Input type="file" name="file" id="exampleFile"
                                       onChange={this.handle_updateBook}
                                    // onChange= {this.onChange}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handle_modal}
                                onClick={this.handle_addBook}>{this.props.title}</Button>{' '}
                        <Button color="secondary" onClick={this.handle_modal}>
                            {this.props.cancel}</Button>
                    </ModalFooter>

                </Modal>

                <Modal isOpen={this.state.EditModal} toggle={this.handling_modal}
                       className={this.props.className}>
                    <ModalHeader toggle={this.handling_modal}>Edit Book</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Edit Book name</Label>
                                <Input type="name" name="name" id="name"
                                       placeholder="Edit Book name"
                                       value={this.state.user.name}
                                       onChange={this.handle_updateBook}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Edit Image</Label>
                                <Input type="file" name="file" id="exampleFile"
                                       onChange={this.handle_updateBook}
                                    // onChange= {this.onChange}
                                />
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handling_modal}
                                onClick={this.handle_EditBook}>
                            Edit
                        </Button>
                        {' '}
                        <Button color="secondary" onClick={this.handling_modal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <table className='row mt-5 p-1'>
                    <tr className='row col-12 mt-12'>
                        <th className='col-4'>
                            name
                        </th>
                        <td className='col-4'>
                            {this.state.user.name}
                        </td>
                    </tr>
                    <tr className='row col-12 mt-12'>
                        <th className='col-4'>
                            phone
                        </th>
                        <td className='col-4'>
                            {this.state.user.phone}
                        </td>
                    </tr>
                    <tr className='row col-12 mt-12'>
                        <th className='col-4'>
                            SSN
                        </th>
                        <td className='col-4'>
                            {this.state.user.SSN}
                        </td>
                    </tr>

                </table>
                <button
                    onClick={this.handle_modal}
                >
                    update
                </button>
            </div>
        );
    }
}

export default UserPage;
