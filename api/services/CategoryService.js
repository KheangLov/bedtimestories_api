module.exports = {

  getCategories: async () => {
    try {
      const data = await Category.find();
      return UtilService.response(data, true);
    } catch(error) {
      return UtilService.response(error);
    }
  }

};