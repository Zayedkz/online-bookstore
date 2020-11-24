var express = require('express');
const con = require ('./connection');
const cors = require("cors");

const books = require('./routes/books');
const register = require('./routes/register');
const login = require('./routes/login');
const orders = require('./routes/orders');
var app = express();
app.use(express.json());
app.use(cors());
app.use('/books', books);
app.use('/register', register);
app.use('/login', login);
app.use('/orders', orders);

// let sql = "SELECT * FROM books";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     // if (!result.length) console.log('empty')
//     // if (result[0].password != "12345") console.log('wrong password')
//     // if (!result) return res.status(400).json({ msg: 'Email does not exist' });
//     // if (!result[0].password != "123") return res.status(400).json({ msg: 'Invalid credentials' });
//     console.log((result.slice(0, 8).map((year) => year.Year)))
// });

// // code used to populate database with book information
// const request = require('request');
// let booklist;
// let API_KEY = '';
// request('https://www.googleapis.com/books/v1/volumes?q="coding"&key='+API_KEY+'&maxResults=30', function (error, response, body) {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     booklist = JSON.parse(body).items;
//     let counter = 70;
//     booklist.forEach((element, index) => {
//         let supplierID = Math.floor(Math.random() * 7) + 1;
//         let quantity = Math.floor(Math.random() * 20) + 1;
//         let price = Math.floor(Math.random() * 30) + 10;
//         let format = ['PAPERBACK', 'HARDCOVER'];
//         let image = element.volumeInfo.imageLinks[Object.keys(element.volumeInfo.imageLinks)[Object.keys(element.volumeInfo.imageLinks).length-1]];
//         let insert_sql = "INSERT INTO books (BookID, BookTitle, Author, Year, Price, Genre, Quantity, Format, Language, SupplierID, API_ID, Description, Image) VALUES "+
//                             "('" + ++counter + "', '" + element.volumeInfo.title + "', '" + element.volumeInfo.authors[0] + 
//                             "', '" + element.volumeInfo.publishedDate + "', '" + price + "', '" + element.volumeInfo.categories[0] + "', '" + quantity + 
//                             "', '" + format[index % 2] + "', '" + element.volumeInfo.language + "', '" + supplierID + "', '" + element.id + 
//                             "', '" + element.searchInfo.textSnippet + "', '" + image + 
//                             "')";
//         con.query(insert_sql, function (err, result) {
//             if (err) throw err;
//         });
//     })
//     console.log('body:', JSON.parse(body).items.length); // Print the HTML for the Google homepage.

// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));