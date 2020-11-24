import React, { Component } from 'react'
import { Container, Col, Row, Form, FormGroup, Button } from 'reactstrap';
import PayPalButton from './PayPalButton';
import axios from 'axios';

export default class Purchase extends Component {
    state = {
        count: 0,
        tax: 0.05,
        pricetotal: 0,
        taxtotal: 0,
        total: 0
      }
    updateCount = (status, price) => {
        if (status === "increment") {
            this.setState(()=> { 
                return {count: this.state.count + 1}
            }, ()=> {
                this.updateTotal(price)
            })
        } else if (status === "decrement") {
            this.setState(()=> { 
                return {count: this.state.count - 1}
            }, ()=> {
                this.updateTotal(price)
            })
        }
    }
    updateTotal = (price) => {
        const pricetotal = this.state.count * price;
        const taxtotal = pricetotal * this.state.tax;
        const total = pricetotal + taxtotal;
        this.setState({
            pricetotal: pricetotal,
            taxtotal: taxtotal,
            total: total
        });
    }
    submit = (CustomerID, BookID, SupplierID, quantity) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({ CustomerID, BookID, SupplierID, quantity }); // turn JS object to JSON
        axios.post('http://localhost:5000/orders', body, config) // body is the data, that is, name, email, password
            .then(res => {
                alert("Success! Order placed, Shipment date: " + res.data.ShipmentDate)
            })
            .catch(err => {
                console.log(err.response.data.msg)
            })
    }
    render() {
        const books = JSON.parse(localStorage.getItem('BooksList'));
        const book = books[localStorage.getItem('book')];
        // const poster = 'https://i.gyazo.com/bbdacba893317df465152629fd4e5b8e.png';
        const { authenticated, id, name, email, address, city, country, postalCode, phone } = JSON.parse(localStorage.getItem('userToken')) || "";
        
        return (
            <Container>
                <Row>
                    <Col className="mx-auto col-md-6 my-4">
                    <img src={book.Image} className="img-fluid poster float-right mr-5" alt="book-poster" />
                    </Col>
                    <Col className="mx-auto col-md-6 my-4">
                    <h3>Checkout</h3>
                    <h6 className="text-capitalize">{`Name: ${name}`}</h6>
                    <h6>{`Email: ${email}`}</h6>
                    <h6>{`Address: ${address}`}</h6>
                    <h6>{`City: ${city}`}</h6>
                    <h6>{`Country: ${country}`}</h6>
                    <h6>{`Postal Code: ${postalCode}`}</h6>
                    <h6>{`Phone: ${phone}`}</h6>
                    <h6>{`Price: $${book.Price}`}</h6>
                    <Form>
                        <FormGroup>
                            <Row>
                            <Col className="col-md-4 my-2 mt-5">
                            <h6 className="mb-1">Quantity</h6>
                            </Col>
                            <Col className="col-md-4 my-2 mt-5 pl-0">
                            <Button
                                name="count"
                                color="dark"
                                className="btn btn-black mx-1"
                                disabled = {this.state.count === 0}
                                onClick={() => this.updateCount("decrement", book.Price)}
                                >
                                -
                            </Button>
                            <strong>{this.state.count}</strong>
                            <Button
                                name="count"
                                color="dark"
                                className="btn btn-black mx-1"
                                disabled = {this.state.count === 8}
                                onClick={() => this.updateCount("increment", book.Price)}
                                >
                                +
                            </Button><p></p>  
                            

                            <h6 style={{marginTop: '2rem'}}>Price: $ {this.state.pricetotal}</h6>
                            <h6>Tax: $ {parseFloat(this.state.taxtotal.toFixed(2))}</h6>
                            <h6>Total: $ {this.state.total}</h6>
                            <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                    onClick={() => this.submit(id, book.BookID, book.SupplierID, this.state.count)}
                                >

                                    SUBMIT</Button>
                            {/* <PayPalButton total={this.state.total}/> */}
                            </Col>
                            </Row>
                            
                        </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
