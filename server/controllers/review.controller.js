const express = require("express");
const reviewRotuer = express.Router();
const cors = require("cors");

const reviewCtrl = {};

const User = require("../models/user");
const Review = require("../models/reviews");
reviewRotuer.use(cors());

reviewCtrl.addReviewToMovie = async (req, res) => {
  const movieId = req.params.movieId;
  const rating = req.body.rating;
  const userId = req.body.userId;
  const review = req.body.review;
  //console.log(req.params.movieId);
  //console.log(movieId);
  let reviewData = {
    rating: rating,
    user_id: userId,
    movie_id: movieId,
    review: review
  }
  Review.create(reviewData)
                  .then((review) => {
                    res.json({ status: "Review added" });
                  })
                  .catch((err) => {
                    res.send("error: " + err);
                  });

};

reviewCtrl.getReviewsByMovie = async (req, res) => {
    Review.find({ movie_id: req.params.movieId })
    .then((reviews) => {
        res.json(reviews);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = reviewCtrl;
