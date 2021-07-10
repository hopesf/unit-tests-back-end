const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb://localhost/movies', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
};