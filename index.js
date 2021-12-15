const express = require("express");
const app = express();
const path = require("path")

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(3000, () => {

    console.log("Listening to port 3000")

})