const { StatusCodes } = require("http-status-codes");
const RecordService = require("../services/record.service.js");

/** Controller to get all records available */
const getAllRecords = async (req, res, next) => {
  try {
    const data = await RecordService.getAllRecords();
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
    const data = await RecordService.newRecord(req.body);
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
