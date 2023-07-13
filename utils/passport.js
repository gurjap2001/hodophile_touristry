const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const users = require('../models/users');
passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      // var User = db.User;
      try {
        const userg = await users.findOne({ where: { email: email } });
        // Username/email does NOT exist
        if (!userg) {
          req.flash('message', 'Email is not registered');
          return done(null, false);
        }
        // Email exist and now we need to verify the password
        const isMatch = await bcrypt.compare(password, userg.password);
  
        if(isMatch){
           return done(null, userg);
        }
        else{
          req.flash('message', 'Password entered here is incorrect');
         return done(null, false); 
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
  );


  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
   
    users.findByPk(id).then(function(user) {
  
        if (user) {
  
            done(null, user.get());
  
        } else {
  
            done(user.error, null);
  
        }
  
    });
  
  });