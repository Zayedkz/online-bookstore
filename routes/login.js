const express = require('express');
const Router = express.Router();
const con = require ('../connection');

// create a post request to database to check login credentials
Router.post('/', (req, res) => {
    // get email and password from the body of request
    const { email, password } = req.body;
    console.log(req.body);
    let sql = "SELECT * FROM users WHERE email = '" + email + "';";
    con.query(sql, function (err, result) {
        if (err) throw err;
        if(result) console.log(result);
        if (!result.length) return res.status(400).json({ msg: 'Email does not exist' });
        if (result[0].password != password) return res.status(400).json({ msg: 'Invalid credentials' });
        
        res.json({
            authenticated: true,
            id: result[0].idusers,
            email: result[0].email,
            name: result[0].name
        })
    });
})

module.exports = Router;