const { StatusCodes } = require("http-status-codes");
const RecordService = require("../services/record.service.js");
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

/** Controller to get all records available */
// recieve: page(offset), pageSize(limit), orderBy(field_name), order(DESC, ASC),
//          searchPatient, searchStaff, searchDate
// send: totalItems, 'items', totalPages, currentPage

const getAllRecords = async (req, res, next) => {
  try {
    const {
      page,
      pageSize,
      orderBy,
      order,
      searchSpecialty,
      searchPatient,
      searchStaff,
      searchDate,
    } = req.body;

    const data = await RecordService.getAllRecords(
      page,
      pageSize,
      orderBy,
      order,
      searchSpecialty,
      searchPatient,
      searchStaff,
      searchDate
    );
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All records fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single record */
const getRecord = async (req, res, next) => {
  try {
    const data = await RecordService.getRecord(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Record fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new record */
const newRecord = async (req, res, next) => {
  try {
    const {
      staffId,
      patientId,
      specialtyId,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;
    const data = await RecordService.newRecord(
      staffId,
      patientId,
      specialtyId,
      appointmentDate,
      appointmentTime,
      reason
    );
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Record created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a record */
const updateRecord = async (req, res, next) => {
  try {
    const data = await RecordService.updateRecord(req.params.id, req.body);
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Record updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single record */
const deleteRecord = async (req, res, next) => {
  try {
    await RecordService.updateRecord(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecords,
  newRecord,
  getRecord,
  updateRecord,
  deleteRecord,
};
