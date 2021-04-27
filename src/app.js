const { response } = require("express")
const express = require("express")
var expressLayouts = require('express-ejs-layouts')

const notes = require("./notes")

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
    const notes_array = notes.index()
    breadcrumb = [
        {
            url: "/",
            name: "Index"
        }
    ]
    response.render("index", {
        breadcrumb: breadcrumb,
        notes: notes_array
    })
})

// display the specified resource
app.get("/docs/read/:title(*)", (request, response) => {
    const notes_array = notes.index()
    title = request.params.title
    data = notes.show(title + ".txt")
    breadcrumb = [
        {
            url: "/",
            name: "Index"
        },
        {
            url: "/",
            name: "Note"
        },
    ]
    response.render("docs/show",{
        breadcrumb: breadcrumb,
        notes: notes_array,
        title: title,
        data: data
    })
})

// show the form for creating a new resource
app.get("/docs/new", (request, response) => {
    const notes_array = notes.index()
    breadcrumb = [
        {
            url: "/",
            name: "Index"
        },
        {
            url: "/",
            name: "New Note"
        },
    ]
    response.render("docs/create", {
        breadcrumb: breadcrumb,
        notes: notes_array
    })
})

// store a newly created resource in storage
app.post('/docs/store', (request, response) => {
    const title = request.body.title
    const body = request.body.body
    notes.store(title + ".txt", body)
    response.redirect('/')
})

// show the form for editing the specified resource
app.get("/docs/edit/:title(*)", (request, response) => {
    const notes_array = notes.index()
    title = request.params.title
    data = notes.show(title + ".txt")
    breadcrumb = [
        {
            url: "/",
            name: "Index"
        },
        {
            url: "/",
            name: "Edit Note"
        },
    ]
    response.render("docs/edit", {
        notes: notes_array,
        breadcrumb: breadcrumb,
        title: title,
        data: data
    })
})

// update the specified resource in storage
app.post("/docs/update", (request, response) => {
    title = request.body.title
    newTitle = request.body.new_title
    newBody = request.body.new_body
    notes.update(title + ".txt", newTitle + ".txt", newBody)
    response.redirect("/")
})

// remove the sprecified resource from storage
app.post("/docs/delete", (request, response) => {
    title = request.body.title
    notes.destroy(title + ".txt")
    response.redirect("/")
})

// display error 404 if the page is not found
app.use(function (req, res) {
    res.status(404).send('error-404 page not found');
});

app.listen(port, () => {
    log('Listening at http://localhost:3000')
})