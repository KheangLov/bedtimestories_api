module.exports = {

  getRoles: async () => {
    try {
      const data = await Role.find();
      return UtilService.response(data, true);
    } catch (error) {
      return UtilService.response(error);
    }
  },

};
