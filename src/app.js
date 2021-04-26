const { response } = require("express")
const express = require("express")
var expressLayouts = require('express-ejs-layouts')

const log  = console.log

// express config
const app = express()
const port = 3000
app.set("view engine", "ejs")
app.use(expressLayouts);
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

// display a listing of the resource
app.get("/", (request, response) => {
    response.send("Index Page")
})

// display error 404 if the page is not found
app.use(function (req, res) {
    res.status(404).send('error-404 page not found');
});

app.listen(port, () => {
    log('Listening at http://localhost:3000')
})