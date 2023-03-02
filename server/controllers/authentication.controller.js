const { StatusCodes } = require("http-status-codes");
const { sequelize } = require("../models/index.js");
const AccountService = require("../services/account.service.js");
const jwt = require("jsonwebtoken");

/** Controller to register */
const register = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let data = await AccountService.findOneByEmail(req.body.email);
    if (data) {
      res.status(StatusCodes.CONFLICT).json({
        code: StatusCodes.CONFLICT,
        data: data,
        message: "This email has already been used or soft-deleted",
      });
    } else {
      data = await AccountService.newAccount(req.body);
      await transaction.commit();
      res.status(StatusCodes.CREATED).json({
        code: StatusCodes.CREATED,
        data: data,
        message: "Account created successfully",
      });
    }
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/** Controller to login */
const login = async (req, res, next) => {
  try {
    const data = await AccountService.findOneByEmailPassword(req.body);
    if (data === null)
      res.status(StatusCodes.UNAUTHORIZED).json({
        code: StatusCodes.UNAUTHORIZED,
        data: data,
        message: "Can not login with given info",
      });
    else {
      const user = {
        id: data.id,
        isStaff: data.isStaff,
        isAdmin: data.staffDetails.isAdmin ? data.staffDetails.isAdmin : false,
      };
      // Create the access token
      console.log(
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_TTL
      );
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_TTL,
      });

      res.status(StatusCodes.CREATED).json({
        code: StatusCodes.CREATED,
        data: { user, accessToken },
        message: "Login successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
