const Joi = require("joi");

const getShiftAssignmentSchema = Joi.object({
  staffId: Joi.number().required().allow(null),
  shiftId: Joi.number().required().allow(null),
  dateList: Joi.array().min(1).items(Joi.date().iso()).required(),
});

const postShiftAssignmentSchema = Joi.object({
  staffId: Joi.number().required(),
  shiftId: Joi.number().required(),
  dateList: Joi.array().min(1).items(Joi.date().iso()).required(),
});

module.exports = { getShiftAssignmentSchema, postShiftAssignmentSchema };
