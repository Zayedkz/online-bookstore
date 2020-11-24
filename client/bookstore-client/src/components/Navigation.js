import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container
} from 'reactstrap';

import Register from './Register';
import Login from './Login';
import Logout from './Logout';

export default class Navigation extends Component {
    state = {
        isOpen: false,
        token: JSON.parse(localStorage.getItem('userToken')) || ""
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        var { authenticated, email, name } = this.state.token || "";
        const userLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong className="text-capitalize">{ authenticated ? `Welcome ${name}` : '' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <Register />
                </NavItem>
                <NavItem>
                    <Login />
                </NavItem>
            </Fragment>
        );
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-4">
                    <Container>
                        
                            <NavbarBrand>
                                <Link to="/" className="remove-text-decoration">
                                    <img src={'https://i.gyazo.com/bbdacba893317df465152629fd4e5b8e.png'} width="50" height="50" alt="bookstore"/>
                                    Bookstore
                                </Link>
                            </NavbarBrand>
                        
                        
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="https://github.com/Zayedkz/online-bookstore">Github</NavLink>
                                    </NavItem>
                                    { authenticated ? userLinks : guestLinks }
                                </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}