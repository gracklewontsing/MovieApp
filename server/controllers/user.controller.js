const express = require("express");
const usersRouter = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userCtrl = {};
const watchlistCtrl = require("./watchlist.controller");

const User = require("../models/user");
usersRouter.use(cors());

process.env.SECRET_KEY = "secret";

userCtrl.createUser = async (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
    watchlist_id: "",
  };
  //Create user & assign Watchlist
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        //Create watchlist
        watchlistCtrl
          .createWatchlist()
          .then((watchlist) => {
            //console.log('watch', watchlist);
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash;
              userData.watchlist_id = watchlist._id;
              User.create(userData)
                .then((user) => {
                  res.json({ status: user.email + " registered" });
                })
                .catch((err) => {
                  res.send("error: " + err);
                });
            });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
};

userCtrl.logUser = async (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          res.json({ error: "User does not exist" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
};

userCtrl.fetchFriends = async (req, res) => {
  var promises = [];
  User.findById(req.params.user_id).then((user) => {
    for (const key in user.friendlist) {
      if (user.friendlist.hasOwnProperty(key)) {
        const friendId = user.friendlist[key];
        promises.push(User.findById(friendId));
      }
    }
    Promise.all(promises).then((ans) => {
      let listOfFriends = [];      
      for (const key in ans) {
        if (ans.hasOwnProperty(key)) {
          const user = ans[key];
          listOfFriends.push({
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          }) ;
        }
      }
      res.json(listOfFriends);
    });
  });
};

userCtrl.findFriends = async (req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => {
      if(!user) {
        res.json({ error: "User does not exist" });
      }
      let userDetail = {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      res.json([userDetail]);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "User does not exist" });
    });
};
module.exports = userCtrl;
