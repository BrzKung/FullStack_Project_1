const mongoose = require('mongoose')

const personalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId
    },
    username: {
        type: String
    },
    head: {
        type: String,
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    job: {
        type: String,
        require: true
    },
    favorite_food: {
        type: String,
        require: true
    },
    createdAt: String
})

const Personal = mongoose.model('personal', personalSchema)
module.exports = Personal