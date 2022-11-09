const { Patient } = require("../models");

//get all patients
const getAllPatients = async () => {
  const data = await Patient.findAll();
  return data;
};

//create new patient
const newPatient = async (body) => {
  const data = await Patient.create(body);
  return data;
};

//update single patient
const updatePatient = async (id, body) => {
  await Patient.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single patient
const deletePatient = async (id) => {
  await Patient.destroy({ where: { id: id } });
  return "";
};

//get single patient
const getPatient = async (id) => {
  const data = await Patient.findByPk(id);
  return data;
};

module.exports = {
  getAllPatients,
  newPatient,
  getPatient,
  updatePatient,
  deletePatient,
};
