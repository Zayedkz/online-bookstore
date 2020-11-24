const express = require('express');
const Router = express.Router();
const con = require ('../connection');

// create a post request to database to check login credentials
Router.post('/', (req, res) => {
    // get email and password from the body of request
    const { email, password } = req.body;
    console.log(req.body);
    let sql = "SELECT * FROM customers WHERE Email = '" + email + "';";
    con.query(sql, function (err, result) {
        if (err) throw err;
        if(result) console.log(result);
        if (!result.length) return res.status(400).json({ msg: 'Email does not exist' });
        if (result[0].Password != password) return res.status(400).json({ msg: 'Invalid credentials' });
        
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

module.exports = Router;