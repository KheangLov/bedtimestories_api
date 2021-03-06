const custom = sails.config.custom;
module.exports = {

  getStories: async req => {
    try {
      let perPage = _.get(req.query, 'per_page') || custom.QUERY.PER_PAGE;
      let page = parseInt(_.get(req.query, 'page')) || 1;
      let date = _.get(req.query, 'date');
      const count = _.get(req.query, 'count');
      let status = _.get(req.query, 'status');

      if (perPage > custom.QUERY.MAX_PER_PAGE) {
        perPage = custom.QUERY.MAX_PER_PAGE;
      }

      if ( page <= 1 ) {
        page = 1;
      }

      if(date === true || date === 'true') {
        date = date;
      } else {
        date = false;
      }

      let byStatus = {};

      if (status) {
        byStatus = {
          status
        };
      }

      const total = await Story.count(byStatus);
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
      let data = {};
      let result = {};
      if(date) {
        data = await Story.find()
          .populate('category_id')
          .populate('user_id')
          .populate('images')
          .limit(perPage)
          .skip(skip)
          .sort([{ updated_date: 'DESC' }]);
        result = {
          total,
          perPage,
          page,
          totalPage,
          data
        };
      } else {
        data = await Story.find()
          .populate('category_id')
          .populate('user_id')
          .populate('images')
          .limit(perPage)
          .skip(skip);
        result = {
          total,
          perPage,
          page,
          totalPage,
          data
        };
      }
      return UtilService.response(result, true);
    } catch (error) {
      return UtilService.response(error);
    }
  },

  getStoryDetail: async req => {
    try {
      const id = req.param('id');
      const result = await Story.find({id}).populate('images').limit(1);
      if (result.length <= 0) {
        throw(new Error(`Story with #${id}, not found!`));
      }
      return UtilService.response(result, true);
    } catch(err) {
      return UtilService.response(err);
    }
  },

  createStory: async req => {
    try {
      const params = req.allParams();
      const error = '';
      const required = {
        title: {
          name: 'Title',
          value: params.title
        }
      };
      if (!required.title.value) {
        error = `${required.title.name} is required!`;
      }
      if (error.length > 0) {
        throw(new Error(error));
      }
      const create = await Story.create(params).fetch();
      return UtilService.response(create, true);
    } catch(err) {
      return UtilService.response(err);
    }
  },

  suggestionStory: async req => {
    try {
      const id = req.param('id');
      const result = await Story.getDatastore().sendNativeQuery(`SELECT stories.*, categories.name
        FROM stories
        INNER JOIN categories
        ON stories.category_id = categories.id
        WHERE stories.id != $1
        LIMIT 5`,
        [id]
      );

      if (result.rows.length <= 0) {
        throw(new Error(`Story with #${id}, not found!`));
      }
      return UtilService.response(result.rows, true);
    } catch(err) {
      return UtilService.response(err);
    }
  }
};
