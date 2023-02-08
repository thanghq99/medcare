const Joi = require("joi");

// == registerSchema, used for admin's create account function
const createAccountSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().min(1).max(1).required(),
  address: Joi.string().allow("", null),
  isStaff: Joi.boolean().default(false).required(),
  degree: Joi.number().required().allow(null),
  specialty: Joi.number().required().allow(null),
  examinationFee: Joi.number().required(),
  isAdmin: Joi.boolean().default(false).required(),
  healthHistory: Joi.string().allow("", null),
  familyHealthHistory: Joi.string().allow("", null),
});

const updateAccountSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().min(1).max(1).required(),
  address: Joi.string().allow("", null),
});

module.exports = { createAccountSchema, updateAccountSchema };
