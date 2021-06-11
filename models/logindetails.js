const mongoose = require('mongoose');

//define schema
const Schema = new mongoose.Schema({
 email:{
         type: String,
         required:true
      },
pswd:{
        type: String,
        required:true,
        minlength: 3
    },
fn:{
        type: String,
        required:true
    },
ln:{
        type: String,
        required:true
    }
},{timestamps:true} 
);
//name the collection
const Logindetails = mongoose.model('logindetails', Schema);
module.exports = Logindetails;