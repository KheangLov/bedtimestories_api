module.exports = {

  getCategories: async () => {
    try {
      const data = await Category.find().populate('stories');
      return UtilService.response(data, true);
    } catch(error) {
      return UtilService.response(error);
    }
  }

};
