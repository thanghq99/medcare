const { Medicine } = require("../models");

//get all medicines
const getAllMedicines = async () => {
  const data = await Medicine.findAll();
  return data;
};

//create new medicine
const newMedicine = async (name) => {
  const data = await Medicine.create({ name: name });
  return data;
};

//update single medicine
const updateMedicine = async (id, name) => {
  await Medicine.update(
    { name: name },
    {
      where: { id: id },
    }
  );
  return name;
};

//delete single medicine
const deleteMedicine = async (id) => {
  await Medicine.destroy({ where: { id: id } });
  return "";
};

//get single medicine
const getMedicine = async (id) => {
  const data = await Medicine.findByPk(id);
  return data;
};

module.exports = {
  getAllMedicines,
  newMedicine,
  getMedicine,
  updateMedicine,
  deleteMedicine,
};
