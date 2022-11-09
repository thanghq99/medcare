const { StatusCodes } = require("http-status-codes");
const AccountService = require("../services/account.service.js");

/** Controller to get all accounts available */
const getAllAccounts = async (req, res, next) => {
  try {
    const data = await AccountService.getAllAccounts();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All accounts fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single account */
const getAccount = async (req, res, next) => {
  try {
    const data = await AccountService.getAccount(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Account fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new account */
const newAccount = async (req, res, next) => {
  try {
    const data = await AccountService.newAccount(req.body);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Account created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a account */
const updateAccount = async (req, res, next) => {
  try {
    const data = await AccountService.updateAccount(req.params.id, req.body);
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Account updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single account */
const deleteAccount = async (req, res, next) => {
  try {
    await AccountService.updateAccount(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAccounts,
  newAccount,
  getAccount,
  updateAccount,
  deleteAccount,
};
