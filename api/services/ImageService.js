const custom = sails.config.custom;
module.exports = {

  getImages: async (req) => {
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

      const total = await Image.count();
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
      const data = await Image.find().limit(perPage).skip(skip);
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
  }

};