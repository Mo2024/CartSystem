const express = require("express");
const mysql = require('mysql')

// Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'my_db',
    port: '3000'
});

// Connect
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('MySql Connected')
});

const app = express();
const path = require("path");

//Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE my_db'
    db.query(sql, (err, result) => {

    });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(3000, () => {

    console.log("Listening to port 3000")

})