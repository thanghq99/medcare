const { Specialty } = require("../models");

//get all specialtys
const getAllSpecialtys = async () => {
  const data = await Specialty.findAll();
  return data;
};

//create new specialty
const newSpecialty = async (body) => {
  const data = await Specialty.create(body);
  return data;
};

//update single specialty
const updateSpecialty = async (id, body) => {
  await Specialty.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single specialty
const deleteSpecialty = async (id) => {
  await Specialty.destroy({ where: { id: id } });
  return "";
};

//get single specialty
const getSpecialty = async (id) => {
  const data = await Specialty.findByPk(id);
  return data;
};

module.exports = {
  getAllSpecialtys,
  newSpecialty,
  getSpecialty,
  updateSpecialty,
  deleteSpecialty,
};
