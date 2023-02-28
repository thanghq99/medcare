const { StatusCodes } = require("http-status-codes");
const { sequelize } = require("../models/index.js");
const ShiftAssignmentService = require("../services/shiftAssignment.service.js");
const ShiftService = require("../services/shift.service.js");

/** Controller to get all shifts available assignment */
const getAllShiftAssignments = async (req, res, next) => {
  try {
    const { staffId, shiftId, dateList } = req.body;
    const data = await ShiftAssignmentService.getAllShiftAssignments(
      staffId, //1 or all | number or null
      shiftId, //1 or all | number or null
      dateList //atleast 1 day
    );
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All shift assignments fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single shift assignment */
const getShiftAssignment = async (req, res, next) => {
  try {
    const data = await ShiftAssignmentService.getShiftAssignment(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Shift assignment fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create new shift assignment(s) */
// Select the staff shifts in the date list.
// Go through each day,
// If there is no staff shift on that day, assign shift.
// If the staff already has a shift and if the start time and end time of the shift are both smaller or greater than the shift to be assigned, assign shift.
// If the above two conditions are not satisfied, the message will match the time of shift with that day.
const newShiftAssignment = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { staffId, shiftId, dateList } = req.body;

    // get assigning shift data
    let assigningShift = await ShiftService.getShift(shiftId);
    const assigningShiftStartTime = assigningShift.startTime;
    const assigningShiftEndTime = assigningShift.endTime;

    //all existing shift assignment of that staff with that shift on all days are looking at
    const existingShiftAssignments =
      await ShiftAssignmentService.getAllShiftAssignments(
        staffId, //must have 1 staff | number
        null, //shiftId must be null to get all shifts to check time conflict between old and new shifts
        dateList //all dates from given array to check time conflict of shifts
      );

    let conflictDate;
    let conflictShift;
    // iterate through each date that need to assign
    const isConflict = dateList.some((date) =>
      // check existing/duplicated/conflict shift on each date

      existingShiftAssignments
        .filter((assignedShift) => {
          let assignedShiftDate = new Date(assignedShift.date).getTime();
          let checkingDate = new Date(date).getTime();
          return assignedShiftDate === checkingDate;
        })
        .some((assignedShift) => {
          const assignedShiftStartTime = assignedShift.shift.startTime;
          const assignedShiftEndTime = assignedShift.shift.endTime;
          console.log({
            assignedShift: assignedShift.date,
            checkingDate: date,
          });
          console.log("check date:", date);
          //check only shifts in this date
          if (
            assignedShift.shiftId === shiftId //exact shift has be assigned
          ) {
            console.log("exact shift has be assigned");
            conflictDate = date;
            conflictShift = assignedShift;
            return true;
          } else if (
            // both start time and end time must be before existing start time or after existing end time
            assigningShiftEndTime <= assignedShiftStartTime ||
            assigningShiftStartTime >= assignedShiftEndTime
          ) {
            console.log("shift time not conflicting");
            return false;
          } else {
            console.log("shift time conflicts");
            conflictDate = date;
            conflictShift = assignedShift;
            return true;
          }
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

      // const data = await ShiftAssignmentService.newShiftAssignment(
      //   bulkShiftAssignmentData
      // );
      await transaction.commit();
      res.status(StatusCodes.CREATED).json({
        code: StatusCodes.CREATED,
        data: "",
        message: "Shift assignment created successfully",
      });
    }
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/** Controller to update a shift assignment */
const updateShiftAssignment = async (req, res, next) => {
  try {
    const data = await ShiftAssignmentService.updateShiftAssignment(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Shift assignment updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single shift assignment */
const deleteShiftAssignment = async (req, res, next) => {
  try {
    await ShiftAssignmentService.deleteShiftAssignment(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Shift assignment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete shift assignments by dates */
const deleteShiftAssignmentByDates = async (req, res, next) => {
  try {
    const { staffId, dateList } = req.body;
    await ShiftAssignmentService.deleteShiftAssignmentByDates(
      staffId,
      dateList
    );
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Shift assignments deleted successfully",
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
  deleteShiftAssignmentByDates,
};
