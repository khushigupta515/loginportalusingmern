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
        // find a user 
        Collection.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            // no user or password doesnot match
            if (!user || user.password != password){
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
    Collection.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        console.log('deserializer using passport successful');
        return done(null, user);
    });
});



module.exports = passport;