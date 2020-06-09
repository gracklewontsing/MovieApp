const express = require("express");
const watchlistRouter = express.Router();
const cors = require("cors");

const watchlistCtrl = {};

const Watchlist = require("../models/watchlist");
const User = require("../models/user");
watchlistRouter.use(cors());

watchlistCtrl.addMovieToWatchlist = async (req, res) => {
  const movieId = req.body.movieId;
  //console.log(req.params.userId);
  //console.log(movieId);

  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        userWatchlistId = user.watchlist_id;
        Watchlist.update(
          { _id: userWatchlistId },
          { $addToSet: { movielist: movieId } }
        )
          .then((watchlist) => {
            //console.log(watchlist);
            if (watchlist.nModified == 0) {
              res.send("Movie was already in watchlist!");
            }
            res.send("Added to watchlist!");
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "Error finding user" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
};

watchlistCtrl.createWatchlist = async () => {
  return Watchlist.create({
    movielist: [],
  });
};

watchlistCtrl.getWatchlistItems = async (req, res) => {
    let userId = req.params.userId;
    User.findById(userId).then(user => {
        Watchlist.findById(user.watchlist_id).then(watchlist => {
            res.send(watchlist.movielist);
        })
    })
    
}
module.exports = watchlistCtrl;
