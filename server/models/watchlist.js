const mongoose = require("mongoose")
const Schema = mongoose.Schema

const WatchlistSchema = new Schema({
    movielist : { 
        type : Array ,
        default : []
    }
})

module.exports = Watchlist = mongoose.model('watchlist', WatchlistSchema)