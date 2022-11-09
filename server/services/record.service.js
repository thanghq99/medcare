const { Record } = require("../models");

//get all records
const getAllRecords = async () => {
  const data = await Record.findAll();
  return data;
};

//create new record
const newRecord = async (body) => {
  const data = await Record.create(body);
  return data;
};

//update single record
const updateRecord = async (id, body) => {
  await Record.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single record
const deleteRecord = async (id) => {
  await Record.destroy({ where: { id: id } });
  return "";
};

//get single record
const getRecord = async (id) => {
  const data = await Record.findByPk(id);
  return data;
};

module.exports = {
  getAllRecords,
  newRecord,
  getRecord,
  updateRecord,
  deleteRecord,
};
