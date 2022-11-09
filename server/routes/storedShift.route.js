const express = require("express");
const storedShiftController = require("../controllers/storedShift.controller");

const router = express.Router();

//route to get all stored shifts
router.get("", storedShiftController.getAllStoredShifts);

//route to creat a new stored shift
router.post("", storedShiftController.newStoredShift);

//route to get a single stored shift by their stored shift id
router.get(":id", storedShiftController.getStoredShift);

//route to update a single stored shift by their stored shift id
router.put(":id", storedShiftController.updateStoredShift);

//route to delete a single stored shift by their stored shift id
router.delete(":id", storedShiftController.deleteStoredShift);

module.exports = router;
