const collection = require('../models/posts');
const passport = require('passport');

module.exports.postsinfo = function(req,res){
    
    collection.create({content:req.query.content,user:req.user._id},function(err){
        if(err)console.log(err);
        else console.log("Inserted succesfuly in the posts collection");
        res.redirect('back');
    })

}
