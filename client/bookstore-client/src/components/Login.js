import React, { Component } from 'react'
import axios from 'axios';
import {
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert
} from 'reactstrap';

export default class Login extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    toggle = () => {
        this.setState({ msg: null });
        this.setState({
            modal: !this.state.modal
        });
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        const {email, password} = this.state;

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        // request body
        const body = JSON.stringify({ email, password }); // turn JS object to JSON
        axios.post('http://localhost:5000/login', body, config) // body is the data, that is, name, email, password
            .then(res => {
                localStorage.setItem('userToken', JSON.stringify(res.data));
                this.toggle();
                this.setState({ msg: null });
                window.location.reload(false);
            })
            .catch((err) => {
                this.setState({ msg: err.response.data.msg });
                // alert(err.response.data.msg);
                localStorage.removeItem('userToken');
            })
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Login</NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    required={true}
                                />
                                <Label for="password">Password</Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    required={true}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >

                                    Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
