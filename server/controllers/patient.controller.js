const { StatusCodes } = require("http-status-codes");
const { sequelize } = require("../models");
const PatientService = require("../services/patient.service.js");
const AccountService = require("../services/account.service.js");

/** Controller to get patients by name or phone number */
const getPatients = async (req, res, next) => {
  try {
    const data = await PatientService.getPatients(req.body);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Patients fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get all patients available */
const getAllPatients = async (req, res, next) => {
  try {
    const data = await PatientService.getAllPatients(req.body);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All patients fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single patient */
const getPatient = async (req, res, next) => {
  try {
    const data = await PatientService.getPatient(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Patient fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new patient */
const newPatient = async (req, res, next) => {
  try {
    const data = await PatientService.newPatient(req.body);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Patient created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a patient */
const updatePatient = async (req, res, next) => {
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
      req.params.id,
      patientData
    );
    const updateAccountResult = await AccountService.updateAccount(
      req.body.accountId,
      accountData
    );

    await transaction.commit();
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: { updatePatientResult, updateAccountResult },
      message: "Patient updated successfully",
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    next(error);
  }
};

/** Controller to delete a single patient */
const deletePatient = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const patient = await PatientService.getPatient(req.params.id);
    const accountId = patient.account.id;

    // 'account hasOne patient' doesnt create on delete cascade on account table
    // so i will just delete account to automatically delete its patient (child)
    await AccountService.deleteAccount(accountId);

    await transaction.commit();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Patient deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

module.exports = {
  getPatients,
  getAllPatients,
  newPatient,
  getPatient,
  updatePatient,
  deletePatient,
};
