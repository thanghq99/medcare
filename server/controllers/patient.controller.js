const { StatusCodes } = require("http-status-codes");
const PatientService = require("../services/patient.service.js");

/** Controller to get all patients available */
const getAllPatients = async (req, res, next) => {
  try {
    const data = await PatientService.getAllPatients();
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
  try {
    const data = await PatientService.updatePatient(req.params.id, req.body);
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Patient updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single patient */
const deletePatient = async (req, res, next) => {
  try {
    await PatientService.deletePatient(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Patient deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPatients,
  newPatient,
  getPatient,
  updatePatient,
  deletePatient,
};
