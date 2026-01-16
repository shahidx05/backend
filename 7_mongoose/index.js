const express = require('express')
const app = express()
const main = require('./database')
const User = require('./models/user')
const port = 3000

app.use(express.json())

app.get('/info', async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.send(allUsers)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/info', async (req, res) => {
    try {
        await User.create(req.body)
        res.send("User created successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete('/info', async (req, res) => {
    try {
        await User.deleteOne({ name: "sk" })
        res.send("User deleted successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.put('/info', async (req, res) => {
    try {
        await User.updateOne(
            { name: "sk" },
            { age: 20 }
        )
        res.send("User updated successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

main()
    .then(async () => {
        console.log("connected to DB")
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
        // const allUsers = await User.find({})
        // console.log("All Users:", allUsers)
    })
    .catch((error) => console.log("error:", error))