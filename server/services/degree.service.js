const { Degree } = require("../models");

//get all degrees
const getAllDegrees = async () => {
  const data = await Degree.findAll();
  return data;
};

//create new degree
const newDegree = async (name) => {
  const data = await Degree.create({ name: name });
  return data;
};

//update single degree
const updateDegree = async (id, name) => {
  await Degree.update(
    { name: name },
    {
      where: { id: id },
    }
  );
  return name;
};

//delete single degree
const deleteDegree = async (id) => {
  await Degree.destroy({ where: { id: id } });
  return "";
};

//get single degree
const getDegree = async (id) => {
  const data = await Degree.findByPk(id);
  return data;
};

module.exports = {
  getAllDegrees,
  newDegree,
  getDegree,
  updateDegree,
  deleteDegree,
};
