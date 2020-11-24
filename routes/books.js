const express = require('express');
const Router = express.Router();
const con = require ('../connection');

// query database for all books
Router.get('/', (req, res) => {
    let sql = "SELECT * FROM books";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})

module.exports = Router;