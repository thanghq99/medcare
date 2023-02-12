const express = require("express");
const patientController = require("../controllers/patient.controller");
const validate = require("../vadilators/validate");
const {
  getPatientSchema,
  updatePatientSchema,
} = require("../vadilators/patient.validator");

const router = express.Router();

//route to get patients by name or phone number
router.post(
  "/get-patients",
  validate(getPatientSchema),
  patientController.getPatients
);

//route to get all patients
router.get("", patientController.getAllPatients);

//route to create a new patient
router.post("", patientController.newPatient);

//route to get a single patient by their patient id
router.get("/:id", patientController.getPatient);

//route to update a single patient by their patient id
router.put("/:id", patientController.updatePatient);

//route to delete a single patient by their patient id
router.delete("/:id", patientController.deletePatient);

module.exports = router;
