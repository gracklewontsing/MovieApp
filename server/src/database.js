const mongoose = require('mongoose');

const URI = 'mongodb+srv://GeneralUser:1234@moviesappcluster-w77q5.mongodb.net/movies?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;