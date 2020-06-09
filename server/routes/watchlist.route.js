const express = require('express');
const router = express.Router();

const watchlistCtrl = require('../controllers/watchlist.controller');



router.post('/addMovieToWatchlist/:userId', watchlistCtrl.addMovieToWatchlist);
router.get('/watchlistItems/:userId', watchlistCtrl.getWatchlistItems);

module.exports = router;