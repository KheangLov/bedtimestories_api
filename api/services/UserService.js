// const User = require("../models/User");
const custom = sails.config.custom;

module.exports = {

  getUsers: async (req) => {
    try {
      let perPage = _.get(req.query, 'per_page') || custom.QUERY.PER_PAGE;
      let page = parseInt(_.get(req.query, 'page')) || 1;
      const count = _.get(req.query, 'count');
      let role = _.get(req.query, 'role');

      if (perPage > custom.QUERY.MAX_PER_PAGE) {
        perPage = custom.QUERY.MAX_PER_PAGE;
      }

      if ( page <= 1 ) {
        page = 1;
      }

      let byRole = {};

      if (role) {
        const getRole = await Role.find({
          where: { name: role },
          select: 'id'
        });

        byRole = { role_id: getRole[0].id };
      }

      const total = await User.count(byRole);
      // If we want to count the records only
      if (count && count.toLowerCase() === 'true') {
        return UtilService.response(total, true);
      }
      if (total < 1) {
        return UtilService.response([], true);
      }
      const totalPage = Math.ceil(total / perPage);
      if (page > totalPage) {
        page = totalPage;
      }
      const skip = (page - 1) * perPage;
      const data = await User.find().populate('role_id').limit(perPage).skip(skip);
      const result = {
        total,
        perPage,
        page,
        totalPage,
        data
      };
      return UtilService.response(result, true);
    } catch (error) {
      return UtilService.response(error);
    }
  },

  createUser: async req => {
    try {
      sails.log(req);
      const params = req.allParams();
      const errors = [];
      const required = {
        firstname: {
          name: 'Firstname',
          value: params.firstname
        },
        lastname: {
          name: 'Lastname',
          value: params.lastname
        },
        password: {
          name: 'Password',
          value: params.password
        },
        role_id: {
          name: 'User\'s role',
          value: params.role_id
        }
      };
      _.forOwn(required, value => {
        if (!value.value) {
          errors.push(`${value.name} is required!`);
        }
      });
      if (errors.length > 0) {
        throw(new Error(`${errors.join(', ')}`));
      }
      const create = await User.create(params).fetch();
      return UtilService.response(create, true);
    } catch(err) {
      return UtilService.response(err);
    }
  },

  userDetail: async req => {
    try {
      const id = req.param('id');
      const result = await User.find({id}).populate('role_id').limit(1);
      if (result.length <= 0) {
        throw(new Error(`User with #${id}, not found!`));
      }
      return UtilService.response(result, true);
    } catch(err) {
      return UtilService.response(err);
    }
  },

  userAuth: async req => {
    try {
      const username = _.get(req.query, 'username');
      const password = _.get(req.query, 'password');
      if (!username && !password) {
        throw(new Error('Username and password is required!'));
      }
      const result = await User.getDatastore().sendNativeQuery(`SELECT * FROM users WHERE
        LOWER(fullname) = LOWER($1) AND password = $2`, [username, password]);
      return UtilService.response(result, true);
    } catch(err) {
      return UtilService.response(err);
    }
  },

  updateUser: async req => {
    try {
      const id = req.param('id');
      if (!id) {
        return UtilService.response(new Error(`User ID is required!`));
      }
      const exist = await User.find({id}).limit(1);
      if (!exist) {
        return UtilService.response(new Error(`User ID, #${id}, not found!`));
      }
      const params = req.body;
      let condition = {};
      sails.log.debug(params);
      const fullname = params.firstname + params.lastname;
      if (fullname !== '') {
        condition.fullname = fullname;
      }
      if (params.email !== '') {
        condition.email = params.email;
      }
      const checkUser = await User.find(condition).limit(1);
      if (!checkUser) {
        throw(new Error('User already existed!'));
      }
      const updated = await User.update(id).set(params).fetch();
      return UtilService.response(updated, true);
    } catch(err) {
      return UtilService.response(err);
    }
  }

};
