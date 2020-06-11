const express = require('express');
const router = express.Router();

const reviewCtrl = require('../controllers/review.controller');



router.post('/addReviewToMovie/:movieId', reviewCtrl.addReviewToMovie);
router.get('/reviewsByMovie/:movieId', reviewCtrl.getReviewsByMovie);

module.exports = router;