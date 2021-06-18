var express = require('express');
var app = express();
const db = require('./config/mongoose');
const port = process.env.PORT||8000;
const cookieParser = require('cookie-parser');


// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passort-local-stategy');
const MongoStore = require('connect-mongo');

//for getting the request as body parameters
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));


app.set('view engine','ejs');
app.set('views','./views');

//to encrypt the cookie in the serializer
//momgostore to store session cookie
app.use(
    session({
                name: 'cookie',
                // TODO change the secret before deployment in production mode
                secret: 'blahsomething',
                saveUninitialized: false,
                resave: false,
                //in milliseconds
                cookie: {maxAge: (1000 * 60 * 100)},
                store: MongoStore.create({  mongoUrl: 'mongodb://localhost/logindetails',autoRemove: 'disabled'},
                function(err){console.log(err);})
            })
        );

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
//remove cache ;goes back to dashboard on presssing back button after signout
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
});

app.use('/',require('./routers/index'));
//server set
app.listen(port,function(err){
    if(err){console.log('error occured');return;}
     console.log('Server up and running on port ',port);
});
