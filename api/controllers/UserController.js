/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    res.send(await UserService.getUsers(req));
  },

  create: async (req, res) => {
    res.send(await UserService.createUser(req));
  }

};

