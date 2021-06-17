const user = require('../models/Logindetails');
const posts = require('../models/posts');


module.exports.home = function(req,res)
{   
    // console.log(req.cookie);
    return res.render('index');

}

module.exports.afterSignIn = function(req,res)
{   console.log('Enter controller afterSignIn');
    
    return res.redirect('/profile');

    //check if email and password match in the database
   
    /*
    Collection.findOne({email:req.query.email},function(err,data){
       if(err){console.log('Search for username failed in sign in');return;}
       
       //user found
       if(data)
       {  if(data.pswd != req.query.pwd)
               //incorrect password
            {console.log('Incorrect password');return res.redirect('back');}
           //correct password
           console.log('correct password');
           res.cookie('user_id',25);
           console.log('cookie created ');

           return res.render('dashboard');
          
        }
       //user not found
       else{console.log('User doesnot exist');return res.redirect('back');}
   });
   */
   

}
//adding to database
module.exports.afterSignUp = function(req,res)
{
    console.log(req.query);
    user.create({
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
    user.findOne({ email:req.query.email},function(err,data)
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
{         console.log('Enter controller profilesessionstarts');
          console.log(req.cookies);
          res.cookie('user_id',25);
           console.log('cookie created ');
           posts.find({}).populate('user').populate('comments').exec(function(err,post){
                    if(err)console.log(err);
                    else console.log("Fetched from posts collection");
                    if(post)
                            return res.render('dashboard',{posts:post});
                       
                   });
        
       
}        

           
           /*
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
    // console.log('reached session start');
   // return res.render('dashboard') ;



//session ends-signout
module.exports.signout = function(req,res){
  
    res.clearCookie('user_id');
    res.clearCookie('cookie');
    req.logOut();
    console.log('cookie cleared and session destroyed');
    return res.redirect('/');
}

