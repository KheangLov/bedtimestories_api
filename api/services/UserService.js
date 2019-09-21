const custom = sails.config.custom;
module.exports = {

  getUsers: async (req) => {
    try {
      let perPage = _.get(req.query, 'per_page') || custom.QUERY.PER_PAGE;
      let page = parseInt(_.get(req.query, 'page')) || 1;
      const count = _.get(req.query, 'count');

      if (perPage > custom.QUERY.MAX_PER_PAGE) {
        perPage = custom.QUERY.MAX_PER_PAGE;
      }

      if ( page <= 1 ) {
        page = 1;
      }

      const total = await User.count();
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
  }

};
