const express = require('express');
const Router = express.Router();
const con = require ('../connection');

// create a post request to database to create order record
Router.post('/', (req, res) => {
    const { CustomerID, BookID, SupplierID, quantity } = req.body;
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var OrderDate = year + '-' + month + '-' + day;

    // var newDate = new Date(date);

    var ShipDate = new Date(date);
    ShipDate.setDate(ShipDate.getDate() + 3);
    var day2 = ShipDate.getDate();
    var month2 = ShipDate.getMonth() + 1;
    var year2 = ShipDate.getFullYear();
    var ShipmentDate = year2 + '-' + month2 + '-' + day2;

    let insert_sql = "INSERT INTO orders (CustomerID, BookID, ShipperID, Quantity, OrderDate, ShipmentDate, PaymentInformation) VALUES " +
                            "('" + CustomerID + "', '" + BookID + "', '" + SupplierID + "', '" + quantity + 
                            "', '" + OrderDate + "', '" + ShipmentDate + "', '" + "PayPal" + 
                            "')";

        con.query(insert_sql, (err, result) => {
            if (err) return res.status(400).json({ msg: err });
            res.json({
                ShipmentDate: ShipmentDate
            })
        })
})

module.exports = Router;