const express = require("express");
const mysql = require('mysql2')


const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/static')))

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Naba1996%",
    database: "sampledb"
});

// db.connect(function (err) {
//     if (err) throw err;
//     console.log('Mysql Connected');
//     db.query("SELECT * FROM menudropdown", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });


app.get('/', async (req, res) => {
    var results = await db.promise().query("SELECT * FROM menudropdown");
    results = results[0];
    console.log(results);
    res.render('home.ejs', { results });
});


app.listen(3000, () => {

    console.log("Listening to port 3000")

});