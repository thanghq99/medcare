const Joi = require("joi");

const shiftSchema = Joi.object({
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
});

module.exports = { shiftSchema };
