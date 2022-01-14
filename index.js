const express = require("express");
const mysql = require('mysql2')
const path = require("path");
const dotenv = require('dotenv');
const app = express();


dotenv.config({ path: './.env' })
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/static')))

// Makes sure data can be grabbed from any form
app.use(express.urlencoded({ extended: false }))
// Makes incoming data as JSON
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.db = db;

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected...")
})

// Requires route through import/export
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))


app.listen(3000, () => {
    console.log("Listening to port 3000")

});

