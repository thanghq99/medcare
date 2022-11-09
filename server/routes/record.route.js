const express = require("express");
const recordController = require("../controllers/record.controller");

const router = express.Router();

//route to get all records
router.get("", recordController.getAllRecords);

//route to creat a new record
router.post("", recordController.newRecord);

//route to get a single record by their record id
router.get(":id", recordController.getRecord);

//route to update a single record by their record id
router.put(":id", recordController.updateRecord);

//route to delete a single record by their record id
router.delete(":id", recordController.deleteRecord);

module.exports = router;
