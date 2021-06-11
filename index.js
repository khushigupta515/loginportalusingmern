var express = require('express');
var app = express();
const db = require('./config/mongoose');
const port = 8000;
const cookieParser = require('cookie-parser');


// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passort-local-stategy');

//for getting the request as body parameters
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views','./views');

//to encrypt the cookie in the serializer
app.use(
    session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {//in milliseconds
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routers/index'));
//server set
app.listen(port,function(err){
    if(err){console.log('error occured');return;}
     console.log('Server up and running on port ',port);
});
