const validator = require('validator');

function validUser(data) {
    const mandatoryField = ["firstName", "lastName", "email", "password"];
    const IsAllowed = mandatoryField.every(k => Object.keys(data).includes(k));
    if (!IsAllowed) {
        throw new Error(`Mandatory fields are missing: ${mandatoryField.join(", ")}`);
    }
    if(!validator.isEmail(data.email)) {
        throw new Error("Invalid email");
    }
    if(!validator.isStrongPassword(data.password)) {
        throw new Error("Password is not strong enough");
    }
    if(data.firstName.length < 3 || data.firstName.length > 30) {
        throw new Error("First name must be between 3 and 30 characters");
    }
}

module.exports = validUser;