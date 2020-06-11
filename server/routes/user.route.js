const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');



router.post('/register', userCtrl.createUser);
router.post('/login', userCtrl.logUser);
router.get('/FriendslistItems/:user_id', userCtrl.fetchFriends);
router.get('/email/:email', userCtrl.findFriends);

module.exports = router;