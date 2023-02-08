const Joi = require("joi");

const degreeSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { degreeSchema };
