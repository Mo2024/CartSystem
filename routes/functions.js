const test = require('../index')
const db = test.db;

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
        if (dropdownResults[i].droprightOfDropdown !== '' && dropdownResults[i].droprightOfDropdown) {
            dropdownResults[i].droprightOfDropdown = dropdownResults[i].droprightOfDropdown.split(",");
        }
    }
}


exports.navBar = navBar;