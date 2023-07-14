const passport =  require('passport');
const LocalStrategy=  require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User  = require('../models/usersSchema');

const local = new LocalStrategy({ usernameField: 'email' }, async function (
  email,
  password,
  done
) {
  try {
    const user = await User.findOne({ email });

    if (!user || !user.isPasswordCorrect(password)) {
      console.log('Invalid Username/Password');
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    console.log(`Error in finding user: ${error}`);
    return done(error);
  }
});



    passport.use('local',local);

    // serializing user
      passport.serializeUser(  function(user,done){
        done(null,user.id);
      });

   //deserializing the user 
   passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  });



  // fucntion for checking user is authenticated or not

  passport.checkAuthentication = async function (req, res, next) {
    try {
      if (req.isAuthenticated()) {
        return next();
      } else {
        return res.redirect('/users/signin');
      }
    } catch (err) {
    
      console.log('Error in checking authentication --> Passport');
      return next(err);
    }
  };
  
  
  passport.setAuthenticatedUser = async function (req, res, next) {
    try {
      if (req.isAuthenticated()) {
        res.locals.user = req.user;
      }
      next();
    } catch (err) {
    
      console.log('Error in setting authenticated user --> Passport');
      return next(err);
    }
  };
  