const mongoose = require('mongoose')

async function main() {
    await mongoose.connect(`mongodb+srv://shahidx05:2005%40Shahid@cluster0.rrnfc1t.mongodb.net/insta`)
}

module.exports = main
