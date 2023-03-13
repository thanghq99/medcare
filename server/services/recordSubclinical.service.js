const { RecordSubclinical, Subclinical } = require("../models");
//get all recordSubclinicals
const getAllRecordSubclinicals = async (recordId) => {
  const data = await RecordSubclinical.findAll({
    where: { recordId: recordId },
    include: [
      {
        model: Subclinical,
        as: "subclinical",
      },
    ],
  });
  return data;
};

//create new recordSubclinical
const newRecordSubclinical = async (body) => {
  const data = await RecordSubclinical.create(body);
  return data;
};

//update single recordSubclinical
const updateRecordSubclinical = async (id, body) => {
  await RecordSubclinical.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single recordSubclinical
const deleteRecordSubclinical = async (id) => {
  await RecordSubclinical.destroy({ where: { id: id } });
  return "";
};

//get single recordSubclinical
const getRecordSubclinical = async (id) => {
  const data = await RecordSubclinical.findByPk(id);
  return data;
};

//get single recordSubclinical by record and subclinical
const getRecordSubclinicalByRecordAndSubclinical = async (body) => {
  const data = await RecordSubclinical.findOne({
    where: {
      recordId: body.recordId,
      subclinicalId: body.subclinicalId,
    },
  });
  return data;
};

module.exports = {
  getAllRecordSubclinicals,
  newRecordSubclinical,
  getRecordSubclinical,
  getRecordSubclinicalByRecordAndSubclinical,
  updateRecordSubclinical,
  deleteRecordSubclinical,
};
