const { StatusCodes } = require("http-status-codes");
const { sequelize } = require("../models/index.js");
const ShiftAssignmentService = require("../services/shiftAssignment.service.js");
const ShiftService = require("../services/shift.service.js");
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { defaultDate } = require("../utils/defaultDate");

/** Controller to get all shifts available */
const getAllShiftAssignments = async (req, res, next) => {
  try {
    const { staffId, shiftId, dateList } = req.body;
    const utcDateList = dateList.map((date) => dayjs(date).utc().format());
    const data = await ShiftAssignmentService.getAllShiftAssignments(
      staffId, //1 or all | number or null
      shiftId, //1 or all | number or null
      utcDateList //atleast 1 day
    );
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
const getShiftAssignment = async (req, res, next) => {
  try {
    const data = await ShiftAssignmentService.getShiftAssignment(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "ShiftAssignment fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create new shift(s) */
// Select the staff shifts in the date list.
// Go through each day,
// If there is no staff shift on that day, assign shift.
// If the staff already has a shift and if the start time and end time of the shift are both smaller or greater than the shift to be assigned, assign shift.
// If the above two conditions are not satisfied, the message will match the time of shift with that day.
const newShiftAssignment = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { staffId, shiftId, dateList } = req.body;
    const utcDateList = dateList.map((date) => dayjs(date).utc().format());

    //get assigning shift data
    let assigningShift = await ShiftService.getShift(shiftId);
    assigningShift = assigningShift.toJSON();
    const assigningShiftStartTime = dayjs(assigningShift.startTime);
    const assigningShiftEndTime = dayjs(assigningShift.endTime);

    //all existing shift assignment of that staff with that shift on all days are looking at
    const existingShiftAssignment =
      await ShiftAssignmentService.getAllShiftAssignments(
        staffId, //must have 1 staff | number
        null, //shiftId must be null to get all shifts to check time conflict between old and new shifts
        utcDateList //all dates from given array to check time conflict of shifts
      );

    let conflictDate;
    let conflictShift;
    // iterate through each date
    const isConflict = dateList.some((date) =>
      // check existing/duplicated/conflict shift on each date
      existingShiftAssignment.some((assignedShift) => {
        assignedShift = assignedShift.toJSON();
        const assignedShiftStartTime = dayjs(assignedShift.shift.startTime);
        const assignedShiftEndTime = dayjs(assignedShift.shift.endTime);
        console.log({ assDate: assignedShift.date, date });
        if (dayjs(assignedShift.date).diff(dayjs(date)) === 0) {
          console.log("must check this day");
          //check only shifts in this date
          if (
            assignedShift.shiftId === shiftId //exact shift has be assigned
          ) {
            console.log("exact shift has be assigned");
            conflictDate = dayjs(date).utc().format();
            conflictShift = assignedShift;
            return true;
          } else if (
            assigningShiftEndTime.diff(assignedShiftStartTime) <= 0 ||
            assigningShiftStartTime.diff(assignedShiftEndTime) >= 0
          ) {
            console.log("shift time not conflicting");
            return false;
          } else {
            console.log("shift time conflicts");
            conflictDate = dayjs(date).utc().format();
            conflictShift = assignedShift;
            return true;
          }
        }
        console.log("not needed to check this day");
        return false;
      })
    );

    if (isConflict) {
      await transaction.commit();
      res.status(StatusCodes.CONFLICT).json({
        code: StatusCodes.CONFLICT,
        data: { conflictDate, conflictShift },
        message: "Assigning shift conflicts with assigned shift",
      });
    } else {
      const bulkShiftAssignmentData = dateList.map((date) => ({
        staffId: staffId,
        shiftId: shiftId,
        date: date,
      }));

      const data = await ShiftAssignmentService.newShiftAssignment(
        bulkShiftAssignmentData
      );
      await transaction.commit();
      res.status(StatusCodes.CREATED).json({
        code: StatusCodes.CREATED,
        data: "",
        message: "ShiftAssignment created successfully",
      });
    }
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/** Controller to update a shift */
const updateShiftAssignment = async (req, res, next) => {
  try {
    const data = await ShiftAssignmentService.updateShiftAssignment(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "ShiftAssignment updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single shift */
const deleteShiftAssignment = async (req, res, next) => {
  try {
    await ShiftAssignmentService.deleteShiftAssignment(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "ShiftAssignment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllShiftAssignments,
  newShiftAssignment,
  getShiftAssignment,
  updateShiftAssignment,
  deleteShiftAssignment,
};
