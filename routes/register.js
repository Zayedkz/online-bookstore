const express = require('express');
const Router = express.Router();
const con = require ('../connection');

// create a post request to database to check registration credentials
Router.post('/', (req, res) => {
    // get name, email and password from the body of request
    const { name, email, password } = req.body;

    let sql = "SELECT * FROM users WHERE email = '" + email + "';";
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length) return res.status(400).json({ msg: 'User already exists' });
        
        let insert_sql = "INSERT INTO users (name, email, password) VALUES ('" + name + "', '" + email + "', '" + password + "')"
        con.query(insert_sql, (err, result) => {
            if (err) return res.status(400).json({ msg: err });
            res.json({
                authenticated: true,
                id: result[0].idusers,
                email: result[0].email,
                name: result[0].name
            })
        })

    });
})

module.exports = Router;