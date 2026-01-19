const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstName:{
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 14,
        max: 65,
        required: true
    },
    gender: {
        type: String,
        // enum: ['male', 'female', 'others'],
        validate(value){
            if (!['male', 'female', 'others'].includes(value)) {
                throw new Error("Invalid gender");
            }
        },
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true, 
        trim: true,
        lowercase: true,
        immutable: true
    },
    password: {
        type: String,
        required: true
    },
    img:{
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"
    }
}, {timestamps: true})

userSchema.methods.FunctionName = function(){
    // function body
     
}

const User = mongoose.model("user", userSchema)

module.exports = User 