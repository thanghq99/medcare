const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

function jwtVerifying(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("token receive:", token);

  if (token == null) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      code: StatusCodes.UNAUTHORIZED,
      data: "",
      message: "No access token is found.",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("error occured", err);

      res.status(StatusCodes.FORBIDDEN).json({
        code: StatusCodes.FORBIDDEN,
        data: "",
        message: "Access token is not valid.",
      });
    } else {
      req.user = user;
      next();
    }
  });
}

module.exports = jwtVerifying;
