const express = require('express');
const Router = express.Router();
const con = require ('../connection');

// View 1: Computes a join of at least three table
Router.get('/view1', (req, res) => {
    let sql = "SELECT * FROM customers " + 
                "LEFT JOIN orders ON customers.CustomerID = orders.CustomerID " +
                "LEFT JOIN books ON orders.BookID = books.BookID";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})
// View 2: Uses nested queries with the ANY or ALL operator and uses a GROUP BY clause
Router.get('/view2', (req, res) => {
    let sql = "SELECT *, COUNT(*) AS PaymentCount FROM customers " + 
                "LEFT JOIN orders ON customers.CustomerID = orders.CustomerID " +
                "WHERE City = ANY (SELECT City FROM customers) " +
                "GROUP BY PaymentInformation";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})
// View 3: A correlated nested query
Router.get('/view3', (req, res) => {
    let sql = "SELECT * FROM shippers " +
                "WHERE ShipperID = ANY (SELECT ShipperID FROM orders WHERE orders.ShipperID = shippers.ShipperID)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})
// View 4: Uses a FULL JOIN
Router.get('/view4', (req, res) => {
    let sql = "SELECT * FROM shippers FULL JOIN orders";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})
// View 5: Uses nested queries with any of the set operations UNION, EXCEPT, or INTERSECT
Router.get('/view5', (req, res) => {
    let sql = "SELECT * FROM customers WHERE City = ANY (SELECT City from customers WHERE City != 'London') " + 
                "UNION " + 
                "SELECT * FROM customers WHERE Country = ANY (SELECT Country from customers WHERE Country != 'Germany')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})
// View 6: Full outer join
Router.get('/view6', (req, res) => {
    let sql = "SELECT * FROM shippers " +
                "LEFT JOIN orders " +
                "ON shippers.ShipperID = orders.ShipperID " +
                "UNION " +
                "SELECT * FROM shippers " +
                "RIGHT JOIN orders " +
                "ON shippers.ShipperID = orders.ShipperID";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})
// View 7: Amount of books supplied
Router.get('/view7', (req, res) => {
    let sql = "SELECT suppliers.*, COUNT(*) AS BooksSupplied FROM suppliers " +
                "LEFT JOIN books " + 
                "ON suppliers.SupplierID = books.SupplierID " +
                "GROUP BY SupplierName";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})
// View 8: Orders made within date
Router.get('/view8', (req, res) => {
    let sql = "SELECT * FROM orders " +
                "WHERE OrderDate BETWEEN '2020-11-02' AND '2020-11-17'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})
// View 9: Check books inventory
Router.get('/view9', (req, res) => {
    let sql = "SELECT * FROM books WHERE Quantity < 4";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})
// View 10: Books bought internationally
Router.get('/view10', (req, res) => {
    let sql = "SELECT * FROM customers " +
                "LEFT JOIN orders " +
                "ON customers.CustomerID = orders.CustomerID " +
                "WHERE City = 'London'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})

module.exports = Router;