const { ShiftAssignment, Staff, Shift, Sequelize } = require("../models");
const Op = Sequelize.Op;

//get all shift assignments
// of one or all staffs at once
// of one or all shifts at once
// in a range of days (1, 7, 31, 1 month(using dayjs library)), require list of dates receive from FE
const getAllShiftAssignments = async (staffId, shiftId, dateList) => {
  const staffCondition = () => {
    if (staffId !== null) {
      return {
        staff_id: staffId,
      };
    } else return {};
  };
  const shiftCondition = () => {
    if (shiftId !== null) {
      return {
        shift_id: shiftId,
      };
    } else return {};
  };
  const dateCondition = () => {
    if (dateList && dateList.length > 0) {
      return {
        date: dateList,
      };
    } else return {};
  };
  const data = await ShiftAssignment.findAll({
    where: [staffCondition(), shiftCondition(), dateCondition()],
    include: [
      { model: Staff, as: "staff", exclude: ["createdAt", "updatedAt"] },
      { model: Shift, as: "shift", exclude: ["createdAt", "updatedAt"] },
    ],
  });
  return data;
};

//create new shift assignment
const newShiftAssignment = async (bulkShiftAssignmentData) => {
  const data = await ShiftAssignment.bulkCreate(bulkShiftAssignmentData, {
    returning: true,
  });
  return data;
};

//update single shift assignment
const updateShiftAssignment = async (id, body) => {
  await ShiftAssignment.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single shift assignment
const deleteShiftAssignment = async (id) => {
  await ShiftAssignment.destroy({ where: { id: id } });
  return "";
};

//get single shift assignment
const getShiftAssignment = async (id) => {
  const data = await ShiftAssignment.findByPk(id, {
    include: [
      { model: Staff, as: "staff", exclude: ["createdAt", "updatedAt"] },
      { model: Shift, as: "shift", exclude: ["createdAt", "updatedAt"] },
    ],
  });
  return data;
};

module.exports = {
  getAllShiftAssignments,
  newShiftAssignment,
  getShiftAssignment,
  updateShiftAssignment,
  deleteShiftAssignment,
};
