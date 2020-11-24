var express = require('express');
const con = require ('./connection');
const cors = require("cors");

const books = require('./routes/books');
const register = require('./routes/register');
const login = require('./routes/login');
var app = express();
app.use(express.json());
app.use(cors());
app.use('/books', books);
app.use('/register', register);
app.use('/login', login);

// let sql = "SELECT * FROM books";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     // if (!result.length) console.log('empty')
//     // if (result[0].password != "12345") console.log('wrong password')
//     // if (!result) return res.status(400).json({ msg: 'Email does not exist' });
//     // if (!result[0].password != "123") return res.status(400).json({ msg: 'Invalid credentials' });
//     console.log((result.slice(0, 8).map((year) => year.Year)))
// });
    

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));