const Joi = require("joi");

const getStaffsSchema = Joi.object({
  searchName: Joi.string().required().allow(""),
  degreeFilter: Joi.string().required().allow(""),
  specialtyFilter: Joi.number().required().allow(null),
  order: Joi.string().valid("DESC", "ASC"),
  page: Joi.number().required(),
  pageSize: Joi.number().required(),
  orderBy: Joi.string().required().allow(""),
});

const updateStaffSchema = Joi.object({
  degree: Joi.string().required().allow(""),
  specialtyId: Joi.number().required().allow(null),
  examinationFee: Joi.number().required(),
});

module.exports = { getStaffsSchema, updateStaffSchema };
