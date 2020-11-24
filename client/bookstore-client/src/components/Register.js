import React, { Component } from 'react'
import axios from 'axios';
import {
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert
} from 'reactstrap';

export default class Register extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        address: '',
        city: '',
        country: '',
        postalcode: '',
        phone: '',
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

        const { name, email, address, city, country, postalcode, phone, password } = this.state;

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        // request body
        const body = JSON.stringify({ name, email, address, city, country, postalcode, phone, password }); // turn JS object to JSON
        // axios({
        //     method: "POST",
        //     url: "http://localhost:5000/register",
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     body: body
        //   }).then(res => {
        //         localStorage.setItem('userToken', JSON.stringify(res.data));
        //         this.toggle();
        //         this.setState({ msg: null });
        //     })
        //     .catch(err => {
        //         this.setState({ msg: err.msg });
        //         localStorage.removeItem('userToken');
        //     })
        axios.post('http://localhost:5000/register', body, config) // body is the data, that is, name, email, password
            .then(res => {
                localStorage.setItem('userToken', JSON.stringify(res.data));
                this.toggle();
                this.setState({ msg: null });
                window.location.reload(false);
            })
            .catch(err => {
                this.setState({ msg: err.response.data.msg });
                localStorage.removeItem('userToken');
            })
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Register</NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    required={true}
                                />
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
                                <Label for="Address">Address</Label>
                                <Input 
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Address"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    required={true}
                                />
                                <Label for="city">City</Label>
                                <Input 
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="City"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    required={true}
                                />
                                <Label for="country">Country</Label>
                                <Input 
                                    type="text"
                                    name="country"
                                    id="country"
                                    placeholder="Country"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    required={true}
                                />
                                <Label for="postalcode">Postal Code</Label>
                                <Input 
                                    type="text"
                                    name="postalcode"
                                    id="postalcode"
                                    placeholder="Postal Code"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    required={true}
                                />
                                <Label for="phone">Phone</Label>
                                <Input 
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    placeholder="Phone"
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

                                    Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
