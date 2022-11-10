const { StatusCodes } = require("http-status-codes");
const { sequelize } = require("../models/index.js");
const AccountService = require("../services/account.service.js");

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
      res.status(StatusCodes.NOT_FOUND).json({
        code: StatusCodes.NOT_FOUND,
        data: data,
        message: "No account found with given username and password",
      });
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Login successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
