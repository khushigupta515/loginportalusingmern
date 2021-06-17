const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Collection = require('../models/Logindetails');

console.log('authentication using passport');
// authentication using passport
passport.use(new LocalStrategy({
    //unique field
        usernameField: 'email'
    },
    function(email, password, done){
        console.log('Entered authentication using pASSPORT');
        console.log(email);
        console.log(password);
        // find a user 
        Collection.findOne({email: email}, function(err, user)  {
            
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            // no user or password doesnot match
            if (!user || user.pswd != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            console.log('User found step 1');
            return done(null, user);
        });
    }


));

console.log('serializer using passport');
// serializing the user to decide which key is to be kept in the cookies(user is there find key)
passport.serializeUser(function(user, done){
    console.log('serializer using passport successful');
    done(null, user._id);
});

console.log('deserializer using passport');
//(id is there find user)
// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    console.log('deserializer using passport successful');
    Collection.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        
        return done(null, user);
    });
});

//check if user is authenticattd
passport.checkAuthentication = function(req,res,next){//middleware
    //to detect if user is signed in or not,inbuilt in passport library
    if(req.isAuthenticated()){
        //let the user view the page,call controller
        return next();
    }
    //if not authenticated then back to signin
    return res.redirect('/signin');

}
passport.setAuthentication = function(req,res,next){//middleware
    
    if(req.isAuthenticated()){
        //request.user contains current signed in user from session cookie,sending this to locals for views
        res.locals.user = req.user;
        
    }
    next();


}

module.exports = passport;