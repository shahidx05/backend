const express = require('express')
const app = express()
const port = 3000

app.use(express.json())


const BookStore = [
    { id: 1, name: "Harry Potter", author: "DevFIux" },
    { id: 2, name: "Friends", author: "Vikas" },
    { id: 3, name: "Nexus", author: "Rohit" },
    { id: 4, name: "Nex", author: "Rohit" }
]

app.get('/', (req, res) => {
    res.send("welcome to book store")
})

app.get('/book', (req, res) => {
    // res.send(BookStore) old

    let result = BookStore
    const { author } = req.query

    if (author) {
        result = result.filter(book =>
            book.author.toLowerCase().includes(author.toLowerCase())
        )
    }

    res.send(result)
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
    if(req.body.name) book.name = req.body.name
    if(req.body.author) book.author = req.body.author
    res.send(book)
})

app.put('/book', (req, res) => {
    const book = BookStore.find(e=>e.id==req.body.id)
    if(!book) return res.send("not found")
     book.author = req.body.author
    book.name = req.body.name
    res.send(book)
})

app.delete('/book/:id', (req, res)=>{
    const idx = BookStore.findIndex(e=>e.id==req.params.id)
    BookStore.splice(idx, 1)
    res.send("delete successfully")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
