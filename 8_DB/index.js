const express = require('express')
const app = express()
const main = require('./database')
const User = require('./models/user')
const port = 3000

app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        // ["firstName", "lastName", "email", "password"].forEach(field => {
        //     if (!req.body[field]) {
        //         throw new Error(`${field} is required`)
        //     }
        // });

        const mandatoryField = ["firstName", "lastName", "email", "password"];

        if (!IsAllowed) {
            throw new Error(`Mandatory fields are missing: ${mandatoryField.join(", ")}`);
        }
        await User.create(req.body)
        res.send("user created successfully")
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get('/info', async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.send(allUsers)
    } catch (error) {
        res.status(500).send("Error" + error.message);
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send("Error" + error.message);
    }
})

app.delete('/user/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send("user deleted successfully")
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.patch('/user', async (req, res) => {
    try {
        const { _id, ...updateData } = req.body
        await User.findByIdAndUpdate(_id, updateData, { runValidators: true })
        res.send("user updated successfully")
    } catch (error) {
        res.status(500).send(error.message);
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


