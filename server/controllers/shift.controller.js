const { StatusCodes } = require("http-status-codes");
const ShiftService = require("../services/shift.service.js");
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { defaultDate } = require("../utils/defaultDate");

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
    const tempStartTime = dayjs(req.body.startTime).utc();
    const tempEndTime = dayjs(req.body.endTime).utc();

    const startTime = defaultDate
      .hour(tempStartTime.hour())
      .minute(tempStartTime.minute());

    const endTime = defaultDate
      .hour(tempEndTime.hour())
      .minute(tempEndTime.minute());

    // End time must be greater than start time
    if (startTime.diff(endTime) >= 0) {
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
        startTime.format(),
        endTime.format()
      );

      console.log(foundShift);
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
        const data = await ShiftService.newShift(
          startTime.format(),
          endTime.format()
        );
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
