const { Staff } = require("../models");

//get all staffs
const getAllStaffs = async () => {
  const data = await Staff.findAll();
  return data;
};

//create new staff
const newStaff = async (body) => {
  const data = await Staff.create(body);
  return data;
};

//update single staff
const updateStaff = async (id, body) => {
  await Staff.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single staff
const deleteStaff = async (id) => {
  await Staff.destroy({ where: { id: id } });
  return "";
};

//get single staff
const getStaff = async (id) => {
  const data = await Staff.findByPk(id);
  return data;
};

module.exports = {
  getAllStaffs,
  newStaff,
  getStaff,
  updateStaff,
  deleteStaff,
};
