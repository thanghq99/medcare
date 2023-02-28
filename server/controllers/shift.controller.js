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
  const { startTime, endTime } = req.body;

  try {
    // End time must be greater than start time
    if (startTime > endTime) {
      res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        data: "",
        message: "End time must be greater than start time",
      });
    } else {
      // shift can not be duplicated
      // if shift is deleted, make it not deleted
      // if shift is created and not deleted, leave it as it is
      const foundShift = await ShiftService.getExistingShift(
        startTime,
        endTime
      );
      if (foundShift && foundShift.isDeleted === false) {
        res.status(StatusCodes.CONFLICT).json({
          code: StatusCodes.CONFLICT,
          data: "",
          message: "Shift already existed",
        });
      } else if (foundShift && foundShift.isDeleted === true) {
        const data = await ShiftService.updateShift(foundShift.id, {
          isDeleted: false,
        });
        res.status(StatusCodes.CREATED).json({
          code: StatusCodes.CREATED,
          data: data,
          message: "Shift restored successfully",
        });
      } else {
        const data = await ShiftService.newShift(startTime, endTime);
        res.status(StatusCodes.CREATED).json({
          code: StatusCodes.CREATED,
          data: data,
          message: "Shift created successfully",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

/** Controller to update a shift */
const updateShift = async (req, res, next) => {
  const { startTime, endTime } = req.body;
  try {
    // End time must be greater than start time
    if (startTime > endTime) {
      res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        data: "",
        message: "End time must be greater than start time",
      });
    } else {
      const foundShift = await ShiftService.getExistingShift(
        startTime,
        endTime
      );
      if (foundShift) {
        res.status(StatusCodes.CONFLICT).json({
          code: StatusCodes.CONFLICT,
          data: "",
          message:
            "Shift already existed. Try re create it if you cant find it on the list.",
        });
      } else {
        const data = await ShiftService.updateShift(req.params.id, {
          startTime: startTime,
          endTime: endTime,
        });
        res.status(StatusCodes.ACCEPTED).json({
          code: StatusCodes.ACCEPTED,
          data: data,
          message: "Shift updated successfully",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single shift */
const deleteShift = async (req, res, next) => {
  try {
    await ShiftService.deleteShift(req.params.id);
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
