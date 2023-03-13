const { RecordMedicine, Medicine } = require("../models");

//get all recordMedicines
const getAllRecordMedicines = async (recordId) => {
  const data = await RecordMedicine.findAll({
    where: { recordId: recordId },
    include: [
      {
        model: Medicine,
        as: "medicine",
      },
    ],
  });
  return data;
};

//create new recordMedicine
const newRecordMedicine = async (body) => {
  const data = await RecordMedicine.create(body);
  return data;
};

//update single recordMedicine
const updateRecordMedicine = async (id, body) => {
  await RecordMedicine.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single recordMedicine
const deleteRecordMedicine = async (id) => {
  await RecordMedicine.destroy({ where: { id: id } });
  return "";
};

//get single recordMedicine
const getRecordMedicine = async (id) => {
  const data = await RecordMedicine.findByPk(id);
  return data;
};

//get single recordMedicine by record and medicine
const getRecordMedicineByRecordAndMedicine = async (body) => {
  const data = await RecordMedicine.findOne({
    where: {
      recordId: body.recordId,
      medicineId: body.medicineId,
    },
  });
  return data;
};

module.exports = {
  getAllRecordMedicines,
  newRecordMedicine,
  getRecordMedicine,
  getRecordMedicineByRecordAndMedicine,
  updateRecordMedicine,
  deleteRecordMedicine,
};
