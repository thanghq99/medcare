const { StatusCodes } = require("http-status-codes");
const StoredShiftService = require("../services/storedShift.service.js");

/** Controller to get all stored shifts available */
const getAllStoredShifts = async (req, res, next) => {
  try {
    const data = await StoredShiftService.getAllStoredShifts();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All storedShifts fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single stored shift */
const getStoredShift = async (req, res, next) => {
  try {
    const data = await StoredShiftService.getStoredShift(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "StoredShift fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new stored shift */
const newStoredShift = async (req, res, next) => {
  try {
    const data = await StoredShiftService.newStoredShift(req.body);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "StoredShift created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a stored shift */
const updateStoredShift = async (req, res, next) => {
  try {
    const data = await StoredShiftService.updateStoredShift(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "StoredShift updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single stored shift */
const deleteStoredShift = async (req, res, next) => {
  try {
    await StoredShiftService.updateStoredShift(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "StoredShift deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStoredShifts,
  newStoredShift,
  getStoredShift,
  updateStoredShift,
  deleteStoredShift,
};
