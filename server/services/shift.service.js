const { Shift } = require("../models");

//get all shifts
const getAllShifts = async () => {
  const data = await Shift.findAll();
  return data;
};

//create new shift
const newShift = async (body) => {
  const data = await Shift.create(body);
  return data;
};

//update single shift
const updateShift = async (id, body) => {
  await Shift.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single shift
const deleteShift = async (id) => {
  await Shift.destroy({ where: { id: id } });
  return "";
};

//get single shift
const getShift = async (id) => {
  const data = await Shift.findByPk(id);
  return data;
};

module.exports = {
  getAllShifts,
  newShift,
  getShift,
  updateShift,
  deleteShift,
};
