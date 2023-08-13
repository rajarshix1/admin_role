const  mongoose = require("mongoose")

const Schema = mongoose.Schema
 const userSchema = new Schema({
    name: {
        type: String,
        required: 'enter name'
    },
    email: {
        type: String,
        required: 'enter email'
    },
    password: {
        type: String,
        required: 'Enter password'
    },
    roles: {
        type: Array,
        default: [],
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
})
module.exports= userSchema