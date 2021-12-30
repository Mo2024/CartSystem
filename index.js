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


app.get('/', async (req, res) => {
    var results = await db.promise().query("SELECT * FROM menudropdown");
    results = results[0];
    await parseArray(results);
    res.render('home.ejs', { results });
});

app.get('/login', async (req, res) => {
    res.render('login.ejs');
});


app.listen(3000, () => {

    console.log("Listening to port 3000")

});
function parseArray(results) {
    for (var i = 0; i < results.length; i++) {
        if (results[i].droprightOfDropdown != null) {
            results[i].droprightOfDropdown = results[i].droprightOfDropdown.split(",");
        }
    }
}