import React, { Component } from 'react'
import { Container, Col, Row, Form, FormGroup, Button } from 'reactstrap';
import PayPalButton from './PayPalButton';

export default class Purchase extends Component {
    state = {
        count: 0,
        tax: 0.05,
        pricetotal: 0,
        taxtotal: 0,
        total: 0
      }
    updateTotal = (status, price) => {
        if (status === "increment") {
            this.setState({
                count: this.state.count + 1
            });
        } else if (status === "decrement") {
            this.setState({
                count: this.state.count - 1
            });
        }
        const pricetotal = this.state.count * price;
        const taxtotal = pricetotal * this.state.tax;
        const total = pricetotal + taxtotal;
        this.setState({
            pricetotal: pricetotal,
            taxtotal: taxtotal,
            total: total
        });
    }
    render() {
        const book = localStorage.getItem('book');
        const poster = 'https://i.gyazo.com/bbdacba893317df465152629fd4e5b8e.png';
        const { authenticated, name, email } = JSON.parse(localStorage.getItem('userToken')) || "";
        
        return (
            <Container>
                <Row>
                    <Col className="mx-auto col-md-6 my-4">
                    <img src={poster} className="img-fluid poster float-right mr-5" alt="book-poster" />
                    </Col>
                    <Col className="mx-auto col-md-6 my-4">
                    <h3>Checkout</h3>
                    <h6 className="text-capitalize">{`Name: ${name}`}</h6>
                    <h6>{`Email: ${email}`}</h6>
                    <h6>{`Price: $${book.Price}`}</h6>
                    <Form>
                        <FormGroup>
                            <Row>
                            <Col className="col-md-4 my-4">
                            <h6 className="mb-4">Quantity</h6>
                            </Col>
                            <Col className="col-md-4 my-4 pl-0">
                            <Button
                                name="count"
                                color="dark"
                                className="btn btn-black mx-1"
                                disabled = {this.state.count === 0}
                                onClick={() => this.updateTotal("decrement", book.Price)}
                                >
                                -
                            </Button>
                            <strong>{this.state.count}</strong>
                            <Button
                                name="count"
                                color="dark"
                                className="btn btn-black mx-1"
                                disabled = {this.state.count === 8}
                                onClick={() => this.updateTotal("increment", book.Price)}
                                >
                                +
                            </Button><p></p>  
                            

                            <h6 style={{marginTop: '7rem'}}>Price: $ {this.state.pricetotal}</h6>
                            <h6>Tax: $ {parseFloat(this.state.taxtotal.toFixed(2))}</h6>
                            <h6>Total: $ {this.state.total}</h6>
                            <PayPalButton total={this.state.total}/>
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
