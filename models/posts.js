const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    content:{type: String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'logindetails'
    },
    comments: [{type:mongoose.Schema.Types.ObjectId,
        ref: 'comments'}]

},{timestamps:true}
);

const postcollection = mongoose.model('postcollection',schema);
module.exports= postcollection;