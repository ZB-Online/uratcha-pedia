const successTrue = (message, resData) => ({
  success: true,
  message: message,
  resData: resData,
});

const successFalse = (message, resData) => ({
  success: false,
  message: message,
  resData: resData,
});

module.exports = {
  successTrue,
  successFalse,
};
