const { StatusCodes } = require("http-status-codes");
const StaffService = require("../services/staff.service.js");

/** Controller to get all staffs available */
const getAllStaffs = async (req, res, next) => {
  try {
    const data = await StaffService.getAllStaffs();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All staffs fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single staff */
const getStaff = async (req, res, next) => {
  try {
    const data = await StaffService.getStaff(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Staff fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new staff */
const newStaff = async (req, res, next) => {
  try {
    const data = await StaffService.newStaff(req.body);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Staff created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a staff */
const updateStaff = async (req, res, next) => {
  try {
    const data = await StaffService.updateStaff(req.params.id, req.body);
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Staff updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single staff */
const deleteStaff = async (req, res, next) => {
  try {
    await StaffService.updateStaff(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Staff deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStaffs,
  newStaff,
  getStaff,
  updateStaff,
  deleteStaff,
};
