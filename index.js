const express = require("express");
const mysql = require('mysql2')
const path = require("path");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')

const app = express();
// Adds security
app.use(helmet())

dotenv.config({ path: './.env' })
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/static')))

// Makes sure data can be grabbed from any form
app.use(express.urlencoded({ extended: false }))
// Makes incoming data as JSON
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    multipleStatements: true,
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

