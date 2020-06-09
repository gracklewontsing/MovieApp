const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    friendlist : { 
        type : Array ,
        default : []
    },
    watchlist_id : { 
        type : String ,
        required : true
    }
})

module.exports = User = mongoose.model('users', UserSchema)