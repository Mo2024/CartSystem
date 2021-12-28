const express = require("express");
const mysql2 = require('mysql2')


const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/static')))

var db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Naba1996%",
    database: "sampledb"
});

db.connect();
var result = db.query('SELECT * FROM menudropdown', (err, rows, fields) => {
    if (err) throw err;
    console.log(rows[0].menudropdown);
})

app.get('/', (req, res) => {
    res.render('home.ejs')

})


app.listen(3000, () => {

    console.log("Listening to port 3000")

})