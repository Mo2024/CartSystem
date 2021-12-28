const express = require("express");
const mysql = require('mysql')


const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

// Create Connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'momo',
    password: 'Naba1996%',
    database: 'sampledb1',
    port: '3000'
});

// Connect
// db.connect((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('MySql Connected');
//     }
// });

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected');

});


// Create DB
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE sampledb1'
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log(result)
//             res.send('Database Created');
//         }


//     });
// });
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE sampledb1'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Database Created');


    });
});

app.listen(3000, () => {

    console.log("Listening to port 3000")

})