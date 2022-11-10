const { StatusCodes } = require("http-status-codes");

const generalErrorHandling = async (error, req, res, next) => {
  console.log(error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    data: error,
    message: "Something was wrong. Try again",
  });
};

module.exports = generalErrorHandling;
