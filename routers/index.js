const express = require('express');
const router = express.Router();
const user_Controller = require('../controllers/users_controllers');
const post_Controller = require('../controllers/posts_controllers');
const comment_controller = require('../controllers/comments_controllers');
const passport = require('passport');

//home page
router.get('/',user_Controller.home);

//signin form
router.get('/signin',function(req,res)
{ //if user is already logged in we donot want signin or signup to happen
    if(req.isAuthenticated())
    return res.redirect('/profile');
return res.render('signin');});
//sign in after authentication
router.get('/sessionaftersignin',passport.authenticate('local',{failureRedirect: '/signin'}),user_Controller.afterSignIn);

//signup form
router.get('/signup',function(req,res)
{ //if user is already logged in we donot want signin or signup to happen
    if(req.isAuthenticated())
    return res.redirect('/profile');
    return res.render('signup');});
//authentication
router.use('/formsubmit',user_Controller.authenticationForSignUp);
//insertion into database
router.get('/formsubmit',user_Controller.afterSignUp);

//profile
//use passport as  a middle ware 
router.get('/profile', passport.checkAuthentication ,user_Controller.profilesessionstarts);
//signout
router.get('/signout',user_Controller.signout);
router.get('/addingtopostscollection',passport.checkAuthentication ,post_Controller.postsinfo);
router.get('/addcommenttopost',passport.checkAuthentication ,comment_controller.addingcommenttodatabase);
router.get('/deletingcomment',passport.checkAuthentication ,comment_controller.deletingcommentfromdatabase);
router.get('/deletingpost',passport.checkAuthentication ,post_Controller.deletingpostfromdatabase);


module.exports = router;



