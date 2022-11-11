const Joi = require("joi");

const subclinicalSchema = Joi.object({
  name: Joi.string().required(),
  examinationFee: Joi.number().required(),
});

module.exports = { subclinicalSchema };
