const collectionComments = require('../models/comments');
const collectionPosts = require('../models/posts');
module.exports.addingcommenttodatabase = function(req,res){
    collectionPosts.findById(req.query.postid,function(err,post){


        collectionComments.create({comment:req.query.comment,forpost:req.query.postid,byuser:req.user._id},function(err,comment){
            if(err)console.log('Error in inserting comment into collection');
            else console.log('Comment succesfully inserted into collection');
            console.log(comment);
            console.log(post);
            post.comments.push(comment);
            post.save();
            res.redirect('back');
            //res.send(req.query.postid);
            //return res.redirect('/updateposts');
        });

    })
   
    

}
module.exports.updatingpostsonaddingcomment = function(req,res){
    console.log('Entered updating');
    collectionPosts.findOne({_id:req.query.postid},function(err,docs){

    });

}