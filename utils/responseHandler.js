const SuccessResponse = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const ErrorResponse = (res, statusCode, message, error = {}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

module.exports = { SuccessResponse, ErrorResponse };
