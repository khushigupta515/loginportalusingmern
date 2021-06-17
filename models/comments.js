const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        comment :{type:String ,required:true},
        forpost :{type: mongoose.Schema.Types.ObjectId,
                  ref: 'posts'},
        byuser:{type: mongoose.Schema.Types.ObjectId,
            ref: 'logindetails'}
    },{timestamps:true}
)

const comments = mongoose.model('comments',schema);
module.exports = comments;
