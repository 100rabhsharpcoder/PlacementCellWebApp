const express = require('express');
const Port= 3000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const app = express();


//setting view enhine ejs
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(
    session({
      secret: "hello", // Change the secret before deployment in production mode
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 10000 },
    })
  );
  
  app.use(express.static('./assets'))
//sessting css stylesheet and js script
app.set('layout extractStyles', true);
app.set('layout extractScript', true);
app.use(express.urlencoded({ extended: true }));


//setting up static file
app.use(express.static('./assets'));
// for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// setting routes 
app.use('/', require('./routes'))
app.listen(Port, function(err){
    if(err){
        console.log('oops error',err);
    }
    console.log('server is working')
})