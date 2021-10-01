const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 30,
        min: 3,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: false
    },
    password: {
        type: String,
        max: 1024,
        min: 6,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("users", UserSchema)