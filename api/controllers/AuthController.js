/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {

  login: (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
      }
      req.logIn(user, (err) => {
        if(err) {
          res.send(err);
        }
        const expiresIn = 60 * 60 * 24;
        const token = jwt.sign(user, sails.config.secret, {
          expiresIn
        });
        return res.send({
          status: true,
          message: info.message,
          data: user,
          token: {
            token,
            expiresIn
          }
        });
      });
    })(req, res);
  },

  logout: (req) => {
    req.logout();
  },

  register: async (req, res) => {
    res.send(await UserService.createUser(req));
  }

};

