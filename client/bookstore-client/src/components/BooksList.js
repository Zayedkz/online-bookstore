import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import { Container, Col, Row, Card, Button, Input } from 'reactstrap';
import axios from 'axios';

export default class BooksList extends Component {
    state = {
        isMouseOver : false,
        id: null,
        books: [],
        index: null,
        searchString: null,
        changedList: true
    }
    componentDidMount = () => {
        this.getBooks();
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
    handleKeyPress = (target) => {
        var searchString = this.state.searchString;
        if (target.charCode===13) {
            axios({
                method: "GET",
                url: "http://localhost:5000/books",
                headers: {
                  "Content-Type": "application/json"
                },
                params: {
                    searchString: searchString
                }
              }).then(res => {
                localStorage.setItem('BooksList', JSON.stringify(res.data));
                this.setState({
                    changedList: !this.state.changedList
                });
              });
        }
    }
    setSearchString = (e) => {
        this.setState({
            searchString: e.target.value
        });
    }
    render() {
        const books = JSON.parse(localStorage.getItem('BooksList'));
        return (
            <Container>
                <Input 
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search..."
                    className="mb-3"
                    onKeyPress={this.handleKeyPress}
                    onChange={this.setSearchString}
                />
                {/* <h1>Best Sellers</h1> */}
                {/* { !isAuthenticated ? <h4>Please login to buy tickets</h4> : null } */}
                <Row className="mt-3">
                    {books.length === 0 ? <h4>No books found.</h4> : books.slice(0, 8).map((element, index) => (
                        <Col key={element.BookID} sm="3 card-margin">
                            <Link to="/details" id={this.state.index} onClick={this.onBookClick.bind(this)}>
                                <Card className="card-styles">
                                    <img height="300px" width="200px" onMouseEnter = {this.setMouseOver.bind(this,element.BookID)} onMouseOut = {this.setMouseOut} className="card-img" src={element.Image} alt="poster" />
                                    { this.state.isMouseOver && element.BookID===this.state.id ? 
                                    <div>
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
