import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {Modal} from "reactstrap"
import axios from "axios";
import Cookies from "universal-cookie";
import AddCategory from "../../service/category/addCategory";
import GetCategories from "../../service/category/category";
import Getmangers from "../../service/getuser";
import AddManger from "../../service/addManger";
// import Deletemanger from "../service/delmanger";
// import Editmanger from "../service/editmanger";

class AddManagersForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            mangers: [],
            newManger: "",
            name: "",
            userName: "",
            phone: "",
            ssn: "",
            email: "",
            password: ""
        };
        this.handle_modal = this.handle_modal.bind(this);
        this.handling_modal = this.handling_modal.bind(this);
    }

    handle_modal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    handling_modal(event) {
        this.handle_updateManager(event);
        this.setState(prevState => ({
            EditModal: !prevState.EditModal
        }));
    }

    componentDidMount() {
          Getmangers()
          .then(data => {
              console.log(data);
              console.log("===================================");
              this.setState({
                mangers: data,
            })
          });
    }


    handleAddName = (e) => {
        let name = e.target.value;
        this.setState({name});
    };
    handleAddUserName = (e) => {
        let userName = e.target.value;
        this.setState({userName});
    };
    handleAddPhone = (e) => {
        let phone = e.target.value;
        this.setState({phone});
    };
    handleAddSsn = (e) => {
        let ssn = e.target.value;
        this.setState({ssn});
    };
    handleAddEmail = (e) => {
        let email = e.target.value;
        this.setState({email});
    };
    handleAddPassword = (e) => {
        let password = e.target.value;
        this.setState({password});
    };

    handle_updateManager = (event) => {
        //   if(event.target.name === "edit") {
        //       let data = JSON.parse(event.target.value);
        //         this.setState({
        //           newMangers: data,
        //         });
        //     }
        //   if(event.target.name === "name") {
        //     this.setState({
        //         newMangers: {...this.state.newMangers, name: event.target.value,}
        //       });
        //     } else if(event.target.name === "file") {
        //         let path = event.target.files[0];
        //         console.log(path);
        //         this.setState({
        //             newMangers: {...this.state.newMangers, photo: path,}
        //         });
        //     }

    }
    handle_addManager = () => {
        AddManger({
            'name': this.state.name,
            'userName': this.state.userName,
            'phone': this.state.phone,
            'SSN': this.state.ssn,
            'email': this.state.email,
            'password': this.state.password,
            'isAdmin':true
        }).then(data => {
            console.log(data);
        });
    };


    handle_EditManager = () => {
        console.log(this.state.newMangers);
        // Editmanger(this.state.newMangers).then(data => {
        //   console.log(data);
        //     Getmangers()
        //     .then(data => {
        //         this.setState({
        //             mangers: data,
        //             newMangers : "",
        //         });
        //     });
        // });
    }

    deletRow = (index) => {
        const mangers = [...this.state.mangers];
        console.log(mangers[index.target.value]._id);
        // Deletemanger(mangers[index.target.value]._id).then((data) => {
        //     console.log(data);
        //     Getmangers().then(data => {
        //     this.setState({
        //       mangers: data,
        //       newMangers : "",
        //     });
        //   });
        // });

    }

    render() {
        return (
            <div>
                <button onClick={this.handle_modal}
                        className='btn btn-info offset-lg-10  offset-md-10  offset-sm-10  offset-xs-10 add_category'>{this.props.title} +
                </button>
                <Modal isOpen={this.state.modal} toggle={this.handle_modal} className={this.props.className}>
                    <ModalHeader toggle={this.handle_modal}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='form-group'>
                                <input type="text" name="username"
                                       onChange={this.handleAddName}
                                       placeholder="User Name"/>
                            </div>
                            <FormGroup>
                                <Input type="name" name="username"
                                       onChange={this.handleAddUserName}
                                       placeholder="Name"/>
                            </FormGroup>

                            <FormGroup>
                                <Input type="number" name="phone"
                                       onChange={this.handleAddPhone}
                                       placeholder="Phone"/>
                            </FormGroup>

                            <FormGroup>
                                <Input type="number" name="ssn"
                                       onChange={this.handleAddSsn}
                                       placeholder="SSN"/>
                            </FormGroup>

                            <FormGroup>
                                <Input type="email" name="email"
                                       onChange={this.handleAddEmail}
                                       placeholder="email"/>
                            </FormGroup>

                            <FormGroup>
                                <Input type="password" name="password"
                                       onChange={this.handleAddPassword}
                                       placeholder="password"/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleFile">Upload Image</Label>
                                <Input type="file" name="file" id="exampleFile"
                                       onChange={this.handle_updateManager}/>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={this.handle_modal}
                                onClick={this.handle_addManager}>
                            {this.props.title}
                        </Button>{' '}
                        <Button color="secondary" onClick={this.handle_modal}>
                            {this.props.cancel}
                        </Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.EditModal} toggle={this.handling_modal} className={this.props.className}>
                    <ModalHeader toggle={this.handling_modal}>Edit Manager</ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Input type="name" name="lastname" id="name"
                                   placeholder="Last Name"
                                //    value={this.state.newMangers.name}
                                   onChange={this.handle_updateManager}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleFile">Upload Image</Label>
                            <Input type="file" name="file" id="exampleFile"
                                   onChange={this.handle_updateManager}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handling_modal}
                                onClick={this.handle_EditManager} color="primary"
                        >Edit</Button>{' '}
                        <Button color="secondary" onClick={this.handling_modal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Table>
                    <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Ssn</th>
                        <th>isAdmin</th>
                        <th>IsActive</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Actions</th>

                    </tr>
                    </thead>
                    <thead>
                    {this.state.mangers.map((manger, index) =>
                        <tr>
                            <th>{index + 1}</th>
                            <th key={index}>
                                <img src={"http://localhost:4000/" + manger.photo}
                                     width="50" height="50" alt="error image"/>
                            </th>
                            <th>
                                {manger.name}
                            </th>
                            <th>
                                <button value={JSON.stringify(manger)} type="button"
                                        className="btn btn-info" name="edit"
                                        onClick={this.handling_modal}>Edit
                                </button>
                                {" "}

                                <button value={index} onClick={this.deletRow.bind(this)}
                                        type="button" className="btn btn-danger">Delete
                                </button>
                            </th>
                        </tr>)}
                    </thead>
                </Table>


            </div>);
    }
}

export default AddManagersForm;
