const Joi = require("joi");

const medicineSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { medicineSchema };
