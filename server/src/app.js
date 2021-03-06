const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const { mongoose } = require('./database');


//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:8080'}));

//Routes
var Users = require("../routes/user.route");
var Watchlist = require("../routes/watchlist.route");
var Review = require("../routes/review.route");

app.use("/users", Users)
app.use("/watchlist", Watchlist)
app.use("/review", Review)

//Start server
app.listen(3000, () => {
    console.log('Server on port', app.get('port'));
})