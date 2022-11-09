const { StatusCodes } = require("http-status-codes");
const ShiftService = require("../services/shift.service.js");

/** Controller to get all shifts available */
const getAllShifts = async (req, res, next) => {
  try {
    const data = await ShiftService.getAllShifts();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All shifts fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single shift */
const getShift = async (req, res, next) => {
  try {
    const data = await ShiftService.getShift(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Shift fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new shift */
const newShift = async (req, res, next) => {
  try {
    const data = await ShiftService.newShift(req.body);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Shift created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a shift */
const updateShift = async (req, res, next) => {
  try {
    const data = await ShiftService.updateShift(req.params.id, req.body);
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Shift updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single shift */
const deleteShift = async (req, res, next) => {
  try {
    await ShiftService.updateShift(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Shift deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllShifts,
  newShift,
  getShift,
  updateShift,
  deleteShift,
};
