var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
//   let sql = "SELECT * FROM books;"
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + Object.keys(result[0]));
//   });
});

module.exports = con;