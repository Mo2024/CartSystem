const express = require("express");
const mysql = require('mysql2')


const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/static')))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sampledb"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected...")
})

app.get('/', async (req, res) => {
    try {
        var results = await db.promise().query("SELECT * FROM menudropdown");
        results = results[0];
        await parseArray(results);
    }
    catch (e) {
        console.log(e);
        results = 0
    }
    res.render('home.ejs', { results });
});

app.get('/login', async (req, res) => {
    res.render('login.ejs');
});
app.get('/signup', async (req, res) => {
    res.render('signup.ejs');
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