const express = require('express')
const bcrypt = require('bcrypt');
const app = express()
const main = require('./database')
const User = require('./models/user')
const validUser = require('./utils/validUser');
const port = 3000

app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        // ["firstName", "lastName", "email", "password"].forEach(field => {
        //     if (!req.body[field]) {
        //         throw new Error(`${field} is required`)
        //     }
        // });

        // OR

        // const mandatoryField = ["firstName", "lastName", "email", "password"];
        // const IsAllowed = mandatoryField.every(k => Object.keys(req.body).includes(k));
        // if (!IsAllowed) {
        //     throw new Error(`Mandatory fields are missing: ${mandatoryField.join(", ")}`);
        // }

        // OR

        validUser(req.body);

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await User.create(req.body)
        res.send("user created successfully")
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }   
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        res.send("Login successful");
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