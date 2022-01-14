const express = require("express");
const test = require('../index')
const router = express.Router();

const db = test.db

router.get('/', async (req, res) => {
    let dropdownResults = await navBar();
    res.render('home.ejs', { dropdownResults });
});
router.get('/login', (req, res) => {
    res.render('login.ejs');
});
router.get('/signup', (req, res) => {
    res.render('signup.ejs');
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



module.exports = router;