module.exports = {
  response: (data, status = false) => {
    const result = {
      status: false
    };
    if (status === false) {
      result.message = data.message;
      return result;
    }
    result.status = true;
    result.data = data;
    return result;
  }
};
