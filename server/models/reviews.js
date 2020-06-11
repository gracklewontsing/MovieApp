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
    movie_id: {
        type: String,
        required: true
    },
    review: { 
        type : String ,
        default : ""
    }
})

module.exports = Review = mongoose.model('review', ReviewSchema)