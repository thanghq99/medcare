const express = require("express");
const recordSubclinicalController = require("../controllers/recordSubclinical.controller");

const router = express.Router();

//route to get all recordSubclinicals
router.post(
  "/get-record-subclinicals",
  recordSubclinicalController.getAllRecordSubclinicals
);

//route to create a new recordSubclinical
router.post("", recordSubclinicalController.newRecordSubclinical);

//route to get a single recordSubclinical by their recordSubclinical id
router.get("/:id", recordSubclinicalController.getRecordSubclinical);

//route to update a single recordSubclinical by their recordSubclinical id
router.put("/:id", recordSubclinicalController.updateRecordSubclinical);

//route to delete a single recordSubclinical by their recordSubclinical id
router.delete("/:id", recordSubclinicalController.deleteRecordSubclinical);

module.exports = router;
