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
  usernameField: 'username',
  passwordField: 'password'
}, ((username, password, cb) => {
  User.findOne({fullname: username}, (err, user) => {
    if(err) return cb(err);
    if(!user) return cb(null, false, {message: 'Username not found'});
    bcrypt.compare(password, user.password, (err, res) => {
      if(!res) return cb(null, false, { message: 'Invalid Password' });
      let userDetails = {
        email: user.email,
        fullname: user.fullname,
        id: user.id
      };
      return cb(null, userDetails, { message: 'Login Succesful'});
    });
  });
})));
