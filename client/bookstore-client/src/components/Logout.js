import React, { Component, Fragment } from 'react'
import { NavLink } from 'reactstrap';

export default class Logout extends Component {
    logout = () => {
        localStorage.removeItem('userToken');
    }
    render() {
        return (
            <Fragment>
                <NavLink onClick={this.logout} href="#">Logout</NavLink>
            </Fragment>
        )
    }
}
