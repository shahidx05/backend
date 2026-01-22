const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const validUser = require('../utils/validUser');
const redisClient = require('../config/redis');
const userAuth = require('../middleware/userAuth');

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }   
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // const token = jwt.sign({ id: user._id, email }, 'secjwt.sign({ id: user._id, email }, 'secret_key',{ expiresIn: '1h' });ret_key',{ expiresIn: '1h' });
        const token = user.getJWT();

        res.cookie('token', token);

        res.send("Login successful");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.post('/logout', userAuth, async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("No token found");
        }

        const payload = jwt.decode(token)

        await redisClient.set(`token:${token}`, "bocked");
        // await redisClient.expire(`token:${token}`, 3600); // 1 hour

        await redisClient.expireAt(`token:${token}`, payload.exp);

        res.cookie('token', null, { expires: new Date(Date.now()) });
        res.send("Logout successful");
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports = router;  