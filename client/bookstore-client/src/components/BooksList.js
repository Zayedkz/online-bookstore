import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import { Container, Col, Row, Card, Button } from 'reactstrap';
import axios from 'axios';

export default class BooksList extends Component {
    state = {
        isMouseOver : false,
        id: null,
        books: [],
        index: null
    }
    getBooks = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/books",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('BooksList', JSON.stringify(res.data));
          });
    }
    setMouseOver = (id) => {
        this.setState({
            isMouseOver: true,
            id: id
        });
    }
    setMouseOut = () => {
        this.setState({
            isMouseOver: false,
            id: null
        });
    }
    onBookClick = (e) => {
        this.setState({
            index: e.target.id
        });
    }
    render() {
        this.getBooks();
        const books = JSON.parse(localStorage.getItem('BooksList'));
        return (
            <Container>
                <h1>Best Sellers</h1>
                {/* { !isAuthenticated ? <h4>Please login to buy tickets</h4> : null } */}
                <Row className="mt-3">
                    {books.map((element, index) => (
                        <Col key={element.BookID} sm="3 card-margin">
                            <Link to="/details" id={this.state.index} onClick={this.onBookClick.bind(this)}>
                                <Card className="card-styles">
                                    <img height="300px" width="200px" onMouseEnter = {this.setMouseOver.bind(this,element.BookID)} onMouseOut = {this.setMouseOut} className="card-img" src={'https://i.gyazo.com/bbdacba893317df465152629fd4e5b8e.png'} alt="poster" />
                                    { this.state.isMouseOver && element.BookID===this.state.id ? 
                                    <div>
                                        {/* <Link to="/tickets"> { isAuthenticated ?  
                                            <Button
                                            color="dark"
                                            className="button-style"
                                            onMouseEnter = {this.setMouseOver.bind(this,id)}
                                            onClick={this.props.selectMovie.bind(this,id)}
                                            
                                            >
                                                BUY TICKETS
                                            </Button> : null}
                                        </Link>  */}
                                        <Link to="/details">
                                            <Button
                                                color="dark"
                                                className="button-style2"
                                                onMouseEnter = {this.setMouseOver.bind(this,element.BookID)}
                                                onClick={localStorage.setItem('book', index)}
                                                
                                            >
                                                DETAILS
                                            </Button>
                                        </Link>
                                    </div> : null 
                                    }
                                </Card>
                            </Link>
                            
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}
