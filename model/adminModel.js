const  mongoose = require("mongoose")

const Schema = mongoose.Schema
 const adminSchema = new Schema({
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
    role: {
        type: String,
        enum: ['admin', 'moderator', 'super'], 
        default: 'super' 
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
})
module.exports= adminSchema