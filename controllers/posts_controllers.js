const postcollection = require('../models/posts');
const commentscollection = require('../models/comments');
const passport = require('passport');

module.exports.postsinfo = function(req,res){
    
    postcollection.create({content:req.query.content,user:req.user._id},function(err){
        if(err)console.log(err);
        else console.log("Inserted succesfuly in the posts collection");
        res.redirect('back');
    })

}

module.exports.deletingpostfromdatabase = function(req,res){
    postcollection.findByIdAndDelete(req.query.post_id_to_be_deleted,function(err,docs){
        if(err)console.log("error in removing post",err);
        console.log('post Deleted from postscollection');
        console.log(docs.comments);
        docs.comments.forEach(function(element) { 
        
            commentscollection.findByIdAndDelete(element,function(err,docs){
                if(err)console.log("error in removing post comments",err);
                console.log('comment deletedfrom commentscollection as post was deleted');
                
            });

        });
        return res.redirect('back');
        
    });

}
