const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    rating: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    },
    review : { 
        type : Array ,
        default : []
    }
})

module.exports = Review = mongoose.model('review', ReviewSchema)