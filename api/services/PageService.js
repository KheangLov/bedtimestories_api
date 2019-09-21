module.exports = {

  getPages: async () => {
    try {
      const data = await Page.find();
      return UtilService.response(data, true);
    } catch(error) {
      return UtilService.response(error);
    }
  }

};