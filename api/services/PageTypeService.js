module.exports = {

  getPageTypes: async () => {
    try {
      const data = await PageType.find();
      return UtilService.response(data, true);
    } catch(error) {
      return UtilService.response(error);
    }
  }

};