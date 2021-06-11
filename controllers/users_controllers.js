const Collection = require('../models/Logindetails');


module.exports.home = function(req,res)
{   
    // console.log(req.cookie);
    return res.render('index');

}

module.exports.afterSignIn = function(req,res)
{//check if email and password match in the database
    Collection.findOne({email:req.query.email},function(err,data){
       if(err){console.log('Search for username failed in sign in');return;}
       
       //user found
       if(data)
       {  if(data.pswd != req.query.pwd)
               //incorrect password
            {console.log('Incorrect password');return res.redirect('back');}
           //correct password
           console.log('correct password');
           return res.redirect('/profile');
           /*
           res.cookie('user_id',data.id);
           console.log('cookie created ');
           */
        }
       //user not found
       else{console.log('User doesnot exist');return res.redirect('back');}
   });

}
//adding to database
module.exports.afterSignUp = function(req,res)
{
    console.log(req.query);
    Collection.create({
        email: req.query.email,
        pswd: req.query.pwd,
        fn : req.query.fn,
        ln : req.query.ln

    },function(err,data)
    {
        if(err)
           {console.log('Error in Insertion,Unique',err);return;}

        console.log('addeddd',data);
        res.send('<div style="font-size:smaller;">Successfully inserted,<a href="/signin" style="text-decoration:none;"> Login</a> to Continue</div>');

    });
    

}
//authentication for signup
//check if email id is unique or not
module.exports.authenticationForSignUp = function(req,res,next)
{
    Collection.findOne({ email:req.query.email},function(err,data)
    {
        if(err){console.log("Query to check if email id is unique  or not failed");return;}
        
  
        console.log(data);
        // returns null if not found in database
        if(data == null)
        {console.log("Unique userid");next();}
        else
        {res.send('<div style="font-size:smaller;">UserId already exists,<a href="/signin" style="text-decoration:none;"> Login</a> to Continue</div>');
        console.log("Userid already exists,try logging in");
        }
        

    });

}

//profile page
module.exports.profilesessionstarts = function(req,res)
{ /*
    if(req.cookies.user_id)
    {
        Logindetails.findById(req.cookies.user_id,function(err,data){
            if(err){console.log('Error in finding id using cookie id');return;}
            else
            return res.render('dashboard',{user:data});

        });
   }
    else
    {
        console.log('cannot enter profile without signing in');
        return res.redirect('/');
    }*/
    console.log('reached session start');
    return res.render('dashboard') ;
    

}

//session ends-signout
module.exports.signout = function(req,res){
  
    /*res.clearCookie('user_id');
    console.log('cookie cleared');*/
    return res.redirect('/');
}

