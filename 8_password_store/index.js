const bcrypt = require('bcrypt')

const password = "Shahid@2005"

// hashcode + salt

const hashing = async() => {
    const hasspass = await bcrypt.hash(password, 10)

    // OR

    // const salt = await bcrypt.genSalt(10)
    // const hasspass = await bcrypt.hash(password, salt)

    console.log("Hashed Password:", hasspass)

    const isMatch = await bcrypt.compare("Shahid@2005", hasspass)
    console.log("Password Match:", isMatch)
}

hashing()