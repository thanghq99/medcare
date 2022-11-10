const express = require("express");
const shiftController = require("../controllers/shift.controller");

const router = express.Router();

//route to get all shifts
router.get("", shiftController.getAllShifts);

//route to create a new shift
router.post("", shiftController.newShift);

//route to get a single shift by their shift id
router.get("/:id", shiftController.getShift);

//route to update a single shift by their shift id
router.put("/:id", shiftController.updateShift);

//route to delete a single shift by their shift id
router.delete("/:id", shiftController.deleteShift);

module.exports = router;
