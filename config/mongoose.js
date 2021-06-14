const mongoose = require('mongoose');
//data base name 
mongoose.connect('mongodb://localhost/logindetails', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected succesfully');
});
module.exports.db = db;

