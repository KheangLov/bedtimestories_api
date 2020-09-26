const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({id}, (err, users) => {
    cb(err, users);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, ((email, password, cb) => {
  User.findOne({email}, (err, user) => {
    if(err) {
      return cb(null, false, { message: err });
    }
    if(!user) {
      return cb(null, false, { message: 'Email not found' });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if(err) {
        return cb(null, false, { message: err });
      }
      if(!res) {
        return cb(null, false, { message: 'Invalid Password' });
      }
      let userDetails = {
        email: user.email,
        fullname: user.fullname,
        id: user.id
      };
      return cb(null, userDetails, { message: 'Login Succesful'});
    });
  });
})));
