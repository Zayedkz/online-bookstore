import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Button } from 'reactstrap';

export default class Details extends Component {
    render() {
        const books = JSON.parse(localStorage.getItem('BooksList'));
        const book = books[localStorage.getItem('book')];
        const poster = 'https://i.gyazo.com/bbdacba893317df465152629fd4e5b8e.png';
        const { authenticated } = JSON.parse(localStorage.getItem('userToken')) || "";
        return (
            <div className="details-page">
                <Container>
                    <Row>
                        <div className="mx-auto col-md-6 my-4">
                        <img src={poster} className="img-fluid poster float-right mr-5" alt="book-poster" />
                        </div>
                        <div className="mx-auto col-md-6 my-5">
                        <h2 className="text-capitalize">{book.BookTitle}</h2>
                        <span className="h5 py-5">{book.Genre}</span>
                        <p className="text-muted lead mt-3 mb-4">Overview: </p>
                        <p className="text-muted lead mt-3 mb-4">Author: {book.Author}</p>
                        <p className="text-muted lead mt-3 mb-4">Language: {book.Language}</p>
                        <p className="text-muted lead mt-3 mb-4">Year: {book.Year}</p>
                        
                            { authenticated ? <Link to="/purchase">
                        <Button
                            color="dark"
                            className="button-style3"
                            >
                                BUY
                            </Button> </Link>: <h4>Please login to purchase book.</h4>}
                        
                            
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}
