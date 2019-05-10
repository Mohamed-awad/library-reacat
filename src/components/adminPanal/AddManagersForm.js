import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {Modal} from "reactstrap"
import GetUsers from "../../service/user/user";
import AddUser from "../../service/user/addUser";
import DeleteUser from "../../service/user/delUser";
import EditUser from "../../service/user/editUser";

class AddUserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      users: [],
      newUser: {},
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
    this.handle_updateUser(event);
    this.setState(prevState => ({
      EditModal: !prevState.EditModal
    }));
  }

  componentDidMount() {
    GetUsers()
        .then(data => {
          let currentUsers = data.data.filter((user) => {
            return user.isAdmin !== 0;
          })
          this.setState({
            users: currentUsers,
            newUser: {},
          })
        });
    console.log(this.state.users);
  }

  handle_updateUser = (event) => {
    if (event.target.name === "edit") {
      let data = JSON.parse(event.target.value);
      this.setState({
        newUser: data,
      });
    }
    console.log(event.target.name);
    console.log(event.target.value);
    if (event.target.name === "name") {

      this.setState({
        newUser: {...this.state.newUser, name: event.target.value,}
      });
    } else if (event.target.name === "username") {
      this.setState({
        newUser: {...this.state.newUser, userName: event.target.value,}
      });
    } else if (event.target.name === "email") {
      console.log(event.target.value);
      this.setState({
        newUser: {...this.state.newUser, email: event.target.value,}
      });
    } else if (event.target.name === "phone") {
      console.log(event.target.value);
      this.setState({
        newUser: {...this.state.newUser, phone: event.target.value,}
      });
    } else if (event.target.name === "ssn") {
      console.log(event.target.value);
      this.setState({
        newUser: {...this.state.newUser, SSN: event.target.value,}
      });
    } else if (event.target.name === "password") {
      console.log(event.target.value);
      this.setState({
        newUser: {...this.state.newUser, password: event.target.value,}
      });
    }

  }
  handle_addUser = () => {
    let NewUser = this.state.newUser;
    NewUser.isAdmin = 0;
    AddUser(NewUser).then(data => {
      console.log(data);
      let users = [...this.state.users, data.data]
      this.setState({
        users,
        newUser: {},
      });
      alert("New User added successfully");
    });
  }

  handle_EditUser = () => {
    console.log(this.state.newUser);
    EditUser(this.state.newUser);
    let users = this.state.users.map((user) => {
      if (this.state.newUser.id == user.id) {
        return this.state.newUser;
      }
      return user;
    });
    this.setState({
      users,
      newUser: "",
    });
  }

  deletRow = (index) => {
    DeleteUser(index.target.value);
    let currentUsers = this.state.users.filter((user) => {
      return user.id != index.target.value;
    });
    this.setState({
      users: currentUsers,
      newUser: {},
    });
    alert("user deleted successfully");
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
                <FormGroup>
                  <Input type="name" name="name" id="name" value={this.state.newUser.name}
                         onChange={this.handle_updateUser}
                         placeholder="name"/>
                </FormGroup>
                <FormGroup>
                  <Input type="email" name="email" id="Email" value={this.state.newUser.email}
                         onChange={this.handle_updateUser}
                         placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                  <Input type="name" name="username" id="username"
                         onChange={this.handle_updateUser} value={this.state.newUser.userName}
                         placeholder="username"/>
                </FormGroup>
                <FormGroup>
                  <Input type="name" name="phone" id="phone"
                         onChange={this.handle_updateUser} value={this.state.newUser.phone}
                         placeholder="Phone"/>
                </FormGroup>
                <FormGroup>
                  <Input type="name" name="ssn" id="SSN"
                         onChange={this.handle_updateUser} value={this.state.newUser.SSN}
                         placeholder="SSN"/>
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="password" id="Password"
                         onChange={this.handle_updateUser} value={this.state.newUser.password}
                         placeholder="Password"/>
                </FormGroup>
              </Form>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handle_modal}
                      onClick={this.handle_addUser}>{this.props.title}</Button>{' '}
              <Button color="secondary" onClick={this.handle_modal}>{this.props.cancel}</Button>
            </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.EditModal} toggle={this.handling_modal} className={this.props.className}>
            <ModalHeader toggle={this.handling_modal}>Edit User</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input type="name" name="name" id="name" value={this.state.newUser.name}
                       onChange={this.handle_updateUser}
                       placeholder="name"/>
              </FormGroup>
              <FormGroup>
                <Input type="email" name="email" id="Email" value={this.state.newUser.email}
                       onChange={this.handle_updateUser}
                       placeholder="Email"/>
              </FormGroup>
              <FormGroup>
                <Input type="name" name="username" id="username"
                       onChange={this.handle_updateUser} value={this.state.newUser.userName}
                       placeholder="username"/>
              </FormGroup>
              <FormGroup>
                <Input type="name" name="phone" id="phone"
                       onChange={this.handle_updateUser} value={this.state.newUser.phone}
                       placeholder="Phone"/>
              </FormGroup>
              <FormGroup>
                <Input type="name" name="ssn" id="SSN"
                       onChange={this.handle_updateUser} value={this.state.newUser.SSN}
                       placeholder="SSN"/>
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" id="Password"
                       onChange={this.handle_updateUser} value={this.state.newUser.password}
                       placeholder="Password"/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handling_modal}
                      onClick={this.handle_EditUser} color="primary"
              >Edit</Button>{' '}
              <Button color="secondary" onClick={this.handling_modal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Table>
            <thead>
            <tr>
              <th>UserName</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>SSN</th>
              <th>IsActive</th>
              <th>Actions</th>

            </tr>
            </thead>
            <thead>
            {this.state.users.map((user, index) =>
                <tr key={user.id}>
                  <th>
                    {user.userName}
                  </th>
                  <th>
                    {user.name}
                  </th>
                  <th>
                    {user.email}
                  </th>
                  <th>
                    {user.phone}
                  </th>
                  <th>
                    {user.SSN}
                  </th>
                  <th>
                    {user.isActive ? "Active" : "not Active"}
                  </th>
                  <th>
                    <button value={JSON.stringify(user)} type="button"
                            className="btn btn-info" name="edit"
                            onClick={this.handling_modal}>Edit
                    </button>
                    {" "}

                    <button value={user.id} onClick={this.deletRow.bind(this)}
                            type="button" className="btn btn-danger">Delete
                    </button>
                  </th>
                </tr>)}
            </thead>
          </Table>
        </div>
    );
  }
}

export default AddUserForm;
