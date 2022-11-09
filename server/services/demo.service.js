const { Demo } = require("../models");

//get all demos
const getAllDemos = async () => {
  const data = await Demo.findAll();
  return data;
};

//create new demo
const newDemo = async (body) => {
  const data = await Demo.create(body);
  return data;
};

//update single demo
const updateDemo = async (id, body) => {
  await Demo.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single demo
const deleteDemo = async (id) => {
  await Demo.destroy({ where: { id: id } });
  return "";
};

//get single demo
const getDemo = async (id) => {
  const data = await Demo.findByPk(id);
  return data;
};

module.exports = {
  getAllDemos,
  newDemo,
  getDemo,
  updateDemo,
  deleteDemo,
};
