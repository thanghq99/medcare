const { StatusCodes } = require("http-status-codes");

const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;

  console.log(valid);
  if (valid) {
    console.log("pass validator");
    next();
  } else {
    console.log("fail validator");
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    console.log("error", message);
    res.status(StatusCodes.BAD_REQUEST).json({
      code: StatusCodes.BAD_REQUEST,
      data: "",
      message: message,
    });
  }
};
module.exports = validator;
