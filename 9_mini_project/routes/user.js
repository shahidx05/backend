const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/', userAuth, async (req, res) => {
    try {
        // const {token} = req.cookies;
        // if(!token) {
        //     throw new Error("No token found");
        // }
        // const payload = jwt.verify(token, 'secret_key');
        // console.log(payload);
        // const user = await User.findById(payload.id)
        // if(!user) {
        //     throw new Error("No user found");
        // }
        res.send(req.user)
    } catch (error) {
        res.status(500).send("Error" + error.message);
    }
})
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send("Error" + error.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send("user deleted successfully")
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.patch('/', async (req, res) => {
    try {
        const { _id, ...updateData } = req.body
        await User.findByIdAndUpdate(_id, updateData, { runValidators: true })
        res.send("user updated successfully")
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;