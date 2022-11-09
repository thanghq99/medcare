const { Subclinical } = require("../models");

//get all subclinicals
const getAllSubclinicals = async () => {
  const data = await Subclinical.findAll();
  return data;
};

//create new subclinical
const newSubclinical = async (body) => {
  const data = await Subclinical.create(body);
  return data;
};

//update single subclinical
const updateSubclinical = async (id, body) => {
  await Subclinical.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single subclinical
const deleteSubclinical = async (id) => {
  await Subclinical.destroy({ where: { id: id } });
  return "";
};

//get single subclinical
const getSubclinical = async (id) => {
  const data = await Subclinical.findByPk(id);
  return data;
};

module.exports = {
  getAllSubclinicals,
  newSubclinical,
  getSubclinical,
  updateSubclinical,
  deleteSubclinical,
};
