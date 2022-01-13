const express = require("express");
const mysql = require('mysql2')
const path = require("path");
const dotenv = require('dotenv');
const app = express();


dotenv.config({ path: './.env' })
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/static')))

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected...")
})

app.get('/', async (req, res) => {
    let dropdownResults = await navBar();


    res.render('home.ejs', { dropdownResults });
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

async function navBar() {
    try {
        var dropdownResults = await db.promise().query("SELECT * FROM menudropdown");
        dropdownResults = dropdownResults[0];
        await parseArray(dropdownResults);
    }
    catch (e) {
        console.log(e);
        dropdownResults = 0;
    }
    return dropdownResults;
}
function parseArray(dropdownResults) {
    for (var i = 0; i < dropdownResults.length; i++) {
        if (dropdownResults[i].droprightOfDropdown != '') {
            dropdownResults[i].droprightOfDropdown = dropdownResults[i].droprightOfDropdown.split(",");
        }
    }
}