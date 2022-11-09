const { StoreShift } = require("../models");

//get all store shifts
const getAllStoreShifts = async () => {
  const data = await StoreShift.findAll();
  return data;
};

//create new store shift
const newStoreShift = async (body) => {
  const data = await StoreShift.create(body);
  return data;
};

//update single store shift
const updateStoreShift = async (id, body) => {
  await StoreShift.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single store shift
const deleteStoreShift = async (id) => {
  await StoreShift.destroy({ where: { id: id } });
  return "";
};

//get single store shift
const getStoreShift = async (id) => {
  const data = await StoreShift.findByPk(id);
  return data;
};

module.exports = {
  getAllStoreShifts,
  newStoreShift,
  getStoreShift,
  updateStoreShift,
  deleteStoreShift,
};
