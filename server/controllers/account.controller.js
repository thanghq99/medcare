const { StatusCodes } = require("http-status-codes");
const { sequelize } = require("../models/index.js");
const AccountService = require("../services/account.service.js");
const PatientService = require("../services/patient.service.js");

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
  const t = await sequelize.transaction();
  try {
    let data = await AccountService.findOneByEmail(req.body.email);
    if (data) {
      await t.rollback();
      res.status(StatusCodes.CONFLICT).json({
        code: StatusCodes.CONFLICT,
        data: data,
        message: "This email has already been used or soft-deleted",
      });
    } else {
      data = await AccountService.newAccount(req.body);
      await t.commit();
      res.status(StatusCodes.CREATED).json({
        code: StatusCodes.CREATED,
        data: data,
        message: "Account created successfully",
      });
    }
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

/** Controller to update a account */
const updateAccount = async (req, res, next) => {
  const patientData = {
    healthHistory: req.body.healthHistory,
    familyHealthHistory: req.body.familyHealthHistory,
  };
  const accountData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
  };
  try {
    transaction = await sequelize.transaction();
    const updatePatientResult = await PatientService.updatePatient(
      req.body.patientId,
      patientData
    );
    const updateAccountResult = await AccountService.updateAccount(
      req.params.id,
      accountData
    );

    await transaction.commit();
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: { updatePatientResult, updateAccountResult },
      message: "Account updated successfully",
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    next(error);
  }
};

/** Controller to toggle isDisabled */
const toggleIsDisabled = async (req, res, next) => {
  console.log("isDisabled", req.body.isDisabled);

  try {
    const data = await AccountService.toggleIsDisabled(req.params.id, req.body);
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Account status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single account */
const deleteAccount = async (req, res, next) => {
  try {
    await AccountService.deleteAccount(req.params.id);
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
  toggleIsDisabled,
};
