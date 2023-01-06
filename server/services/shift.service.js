const { where } = require("sequelize");
const { Shift } = require("../models");

//get all shifts
const getAllShifts = async () => {
  const data = await Shift.findAll({
    where: {
      isDeleted: false,
    },
  });
  return data;
};

//create new shift
const newShift = async (startTime, endTime) => {
  console.log({ startTime, endTime });
  const data = await Shift.create({ startTime: startTime, endTime: endTime });
  return data;
};

//update single shift
const updateShift = async (id, body) => {
  await Shift.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single shift by set isDeleted to true
const deleteShift = async (id) => {
  // await Shift.destroy({ where: { id: id } });
  await Shift.update(
    {
      isDeleted: true,
    },
    {
      where: { id: id },
    }
  );
  return "";
};

//get single shift
const getShift = async (id) => {
  const data = await Shift.findByPk(id);
  return data;
};

//find existed shift
const getExistingShift = async (startTime, endTime) => {
  const data = await Shift.findOne({
    where: { startTime: startTime, endTime: endTime },
  });
  return data;
};

module.exports = {
  getAllShifts,
  newShift,
  getShift,
  getExistingShift,
  updateShift,
  deleteShift,
};
