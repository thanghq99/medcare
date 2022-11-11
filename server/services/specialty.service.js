const { Specialty } = require("../models");

//get all specialtys
const getAllSpecialties = async () => {
  const data = await Specialty.findAll();
  return data;
};

//create new specialty
const newSpecialty = async (name) => {
  const data = await Specialty.create({ name: name });
  return data;
};

//update single specialty
const updateSpecialty = async (id, name) => {
  await Specialty.update(
    { name: name },
    {
      where: { id: id },
    }
  );
  return name;
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
  getAllSpecialties,
  newSpecialty,
  getSpecialty,
  updateSpecialty,
  deleteSpecialty,
};
