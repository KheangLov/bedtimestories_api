module.exports = {
  response: (data, status = false) => {
    const result = {
      status: false
    };
    if (!status) {
      result.message = data.message;
      return result;
    }
    result.status = true;
    result.message = 'Success';
    result.data = data;
    return result;
  }
};
