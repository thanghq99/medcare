const express = require("express");
const recordMedicineController = require("../controllers/recordMedicine.controller");

const router = express.Router();

//route to get all recordMedicines
router.post(
  "/get-record-medicines",
  recordMedicineController.getAllRecordMedicines
);

//route to create a new recordMedicine
router.post("", recordMedicineController.newRecordMedicine);

//route to get a single recordMedicine by their recordMedicine id
router.get("/:id", recordMedicineController.getRecordMedicine);

//route to update a single recordMedicine by their recordMedicine id
router.put("/:id", recordMedicineController.updateRecordMedicine);

//route to delete a single recordMedicine by their recordMedicine id
router.delete("/:id", recordMedicineController.deleteRecordMedicine);

module.exports = router;
