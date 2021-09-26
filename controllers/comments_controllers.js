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

module.exports.deletingcommentfromdatabase= function(req,res){

collectionComments.findByIdAndDelete(req.query.comment_id_to_be_deleted,function(err,docs){
    if(err)console.log("error in removing comment",err);
    console.log('comment Deleted from commentscollection');
    console.log(docs);
    collectionPosts.findByIdAndUpdate(docs.forpost,{$pull:{comments:docs._id}},function(err,commentid){
        if(err)console.log("error in finding post of the comment to be deleted",err);
        console.log('comment Deleted from postscollection');
        return res.redirect('back');
    });
    
});



}