const Joi = require("joi");

const specialtySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { specialtySchema };
