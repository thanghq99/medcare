const Joi = require("joi");

const getPatientSchema = Joi.object({
  searchValue: Joi.string().required().allow(""),
  order: Joi.string().valid("DESC", "ASC"),
  page: Joi.number().required(),
  pageSize: Joi.number().required(),
  orderBy: Joi.string().required().valid("", "firstName", "dob", "gender"),
});

const updatePatientSchema = Joi.object({
  healthHistory: Joi.string().required().allow(""),
  familyHealthHistory: Joi.string().required().allow(""),
});

module.exports = { getPatientSchema, updatePatientSchema };
