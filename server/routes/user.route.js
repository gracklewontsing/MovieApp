const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');



router.post('/register', userCtrl.createUser);
router.post('/login', userCtrl.logUser);

module.exports = router;