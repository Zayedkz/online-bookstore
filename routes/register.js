const express = require('express');
const Router = express.Router();
const con = require ('../connection');

// create a post request to database to check registration credentials
Router.post('/', (req, res) => {
    // get name, email and password from the body of request
    const { name, email, address, city, country, postalcode, phone, password } = req.body;

    let sql = "SELECT * FROM customers WHERE Email = '" + email + "';";
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length) return res.status(400).json({ msg: 'User already exists' });
        
        let insert_sql = "INSERT INTO customers (CustomerName, Email, Address, City, Country, PostalCode, Phone, Password) VALUES " +
                            "('" + name + "', '" + email + "', '" + address + "', '" + city + "', '" + country + "', '" + postalcode + "', '" + phone + "', '" + password + 
                            "')";

        con.query(insert_sql, (err, result) => {
            if (err) return res.status(400).json({ msg: err });
            con.query("SELECT * FROM customers WHERE Email = '" + email + "';", function (err, result) {
                if (err) throw err;
                res.json({
                    authenticated: true,
                    id: result[0].CustomerID,
                    email: result[0].Email,
                    name: result[0].CustomerName,
                    address: result[0].Address,
                    city: result[0].City,
                    country: result[0].Country,
                    postalCode: result[0].PostalCode,
                    phone: result[0].Phone
                })
            });
        })

    });
})

module.exports = Router;