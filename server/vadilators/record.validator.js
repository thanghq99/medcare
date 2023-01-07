const Joi = require("joi");

const createRecordSchema = Joi.object({
  staffId: Joi.number().required(),
  patientId: Joi.number().required(),
  specialtyId: Joi.number().required(),
  appointmentTime: Joi.date().iso().required(),
  reason: Joi.string().required(),
});

const updateRecordSchema = Joi.object({
  staffId: Joi.number().required(),
  specialtyId: Joi.number().required(),
  status: Joi.string().valid("requested", "accepted", "done", "canceled"),
  appointmentTime: Joi.date().iso().required(),
  reason: Joi.string().required(),
  clinicalInformation: Joi.string().required().allow(""),
  height: Joi.number().required(),
  weight: Joi.number().required(),
  bloodPressure: Joi.number().required(),
  heartRate: Joi.number().required(),
  respirationRate: Joi.number().required(),
  temperature: Joi.number().required(),
  diagnose: Joi.string().required().allow(""),
  treatmentDirection: Joi.string().required().allow(""),
});
module.exports = { createRecordSchema, updateRecordSchema };
