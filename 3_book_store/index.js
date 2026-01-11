const express = require('express')
const app = express()
const port = 3000

app.use(express.json())


const BookStore = [
    { id: 1, name: "Harry Potter", author: "DevFIux" },
    { id: 2, name: "Friends", author: "Vikas" },
    { id: 3, name: "Nexus", author: "Roht" }
]

app.get('/', (req, res) => {
    res.send("welcome to book store")
})

app.get('/book', (req, res) => {
    res.send(BookStore)
})

app.get('/book/:id', (req, res) => {
    const {id} = req.params
    const book = BookStore.find(e => e.id == id)
    if(book) return res.send(book)
    res.send("book not found")
})

app.post('/book', (req, res) => {
    console.log(req.body) 
    BookStore.push(req.body)
    res.send(req.body)
})

app.patch('/book', (req, res) => {
    const book = BookStore.find(e=>e.id==req.body.id)
    if(!book) return res.send("not found")
    book = req.body
    res.send(book)
})

app.put('/book/:id', (req, res) => {
    const {id} = req.params

    console.log(req.body) 
    BookStore.push(req.body)
    res.send(req.body)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
