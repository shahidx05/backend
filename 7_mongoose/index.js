const express = require('express')
const app = express()
const main = require('./database')
const User = require('./models/user')
const port = 3000

main()
    .then(async() => {
        console.log("connected to DB")
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
            const allUsers = await User.find({})
    console.log("All Users:", allUsers)
    })
    .catch((error) => console.log("error:", error))


