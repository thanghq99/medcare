const express = require("express");
const recordController = require("../controllers/record.controller");
const validate = require("../vadilators/validate");
const {
  createRecordSchema,
  updateRecordSchema,
} = require("../vadilators/record.validator");

const router = express.Router();

//route to get all records
router.get("", recordController.getAllRecords);

//route to create a new record
router.post("", validate(createRecordSchema), recordController.newRecord);

//route to get a single record by their record id
router.get("/:id", recordController.getRecord);

//route to update a single record by their record id
router.put("/:id", validate(updateRecordSchema), recordController.updateRecord);

//route to delete a single record by their record id
router.delete("/:id", recordController.deleteRecord);

module.exports = router;
