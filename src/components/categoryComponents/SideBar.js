import React, {Component} from 'react';
import '../../App.css';
import {Nav, NavItem, NavLink} from "reactstrap";
import Cookies from "universal-cookie";


class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bb : this.props,
    }
  }

    componentDidMount() {
      console.log(this.state.bb);
        let cookies = new Cookies();
        if (!cookies.get('token')) {
            window.location = "http://localhost:3000/";
        }
    }

    render() {
        return (
            <Nav vertical>
                <NavItem>
                    <button onClick={this.props.all}>all</button>
                    <hr/>
                </NavItem>
                <NavItem>
                  <button onClick={this.props.read}>Read</button>
                    <hr/>
                </NavItem>
                <NavItem>
                  <button onClick={this.props.currentlyRead}>Currently Reading</button>
                    <hr/>
                </NavItem>
                <NavItem>
                  <button onClick={this.props.wantToRead}>Want to Read</button>
                </NavItem>
            </Nav>

        );
    }
}

export default SideBar;
