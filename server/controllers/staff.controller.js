const { StatusCodes } = require("http-status-codes");
const { sequelize } = require("../models/index.js");
const StaffService = require("../services/staff.service.js");
const AccountService = require("../services/account.service.js");

/** Controller to get all staffs available */
// recieve: page(offset), pageSize(limit), orderBy(field_name), order(DESC, ASC),
//          searchName, degreeFilter, specialtyFilter
// send: totalItems, 'items', totalPages, currentPage

const getAllStaffs = async (req, res, next) => {
  try {
    const data = await StaffService.getAllStaffs(req.body);
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
  const staffData = {
    isAdmin: req.body.isAdmin,
    degree: req.body.degree,
    examinationFee: req.body.examinationFee,
    specialty: req.body.specialty,
  };
  const accountData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
  };
  try {
    transaction = await sequelize.transaction();
    const updateStaffResult = await StaffService.updateStaff(
      req.params.id,
      staffData
    );
    const updateAccountResult = await AccountService.updateAccount(
      req.body.accountId,
      accountData
    );

    await transaction.commit();
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: { updateStaffResult, updateAccountResult },
      message: "Staff updated successfully",
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    next(error);
  }
};

/** Controller to delete a single staff */
const deleteStaff = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const staff = await StaffService.getStaff(req.params.id);
    const accountId = staff.account.id;

    // 'account hasOne staff' doesnt create on delete cascade on account table
    // so i will just delete account to automatically delete its staff (child)
    await AccountService.deleteAccount(accountId);

    await transaction.commit();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Staff deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
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
