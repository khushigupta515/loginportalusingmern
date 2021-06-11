const express = require('express');
const router = express.Router();
const user_Controller = require('../controllers/users_controllers');
const passport = require('passport');

//home page
router.get('/',user_Controller.home);

//signin form
router.get('/signin',function(req,res)
{ return res.render('signin');});
//sign in after authentication
router.get('/sessionaftersignin',user_Controller.afterSignIn);

//signup form
router.get('/signup',function(req,res)
{ return res.render('signup');});
//authentication
router.use('/formsubmit',user_Controller.authenticationForSignUp);
//insertion into database
router.get('/formsubmit',user_Controller.afterSignUp);

//profile
//use passport as  a middle ware 
router.get('/profile',passport.authenticate('local',{failureRedirect: '/signin'}
),user_Controller.profilesessionstarts);
//signout
router.get('/signout',user_Controller.signout);

module.exports = router;



