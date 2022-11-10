const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  dob: Joi.date().required(),
  gender: Joi.string().min(1).max(1).required(),
  address: Joi.string().allow("", null),
  isStaff: Joi.boolean().default(false).required(),
  degree: Joi.string().required().allow("", null),
  examinationFee: Joi.number().required(),
  isAdmin: Joi.boolean().default(false).required(),
  heathHistory: Joi.string().allow("", null),
  familyHealthHistory: Joi.string().allow("", null),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
