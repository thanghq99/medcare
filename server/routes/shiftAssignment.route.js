const express = require("express");
const shiftAssignmentController = require("../controllers/shiftAssignment.controller");
const validate = require("../vadilators/validate");
const {
  getShiftAssignmentSchema,
  postShiftAssignmentSchema,
} = require("../vadilators/shiftAssignment.validator");

const router = express.Router();

//route to get all shift assignments
router.get(
  "",
  validate(getShiftAssignmentSchema),
  shiftAssignmentController.getAllShiftAssignments
);

//route to create a new shift assignment
router.post(
  "",
  validate(postShiftAssignmentSchema),
  shiftAssignmentController.newShiftAssignment
);

//route to get a single shift assignment by their shift id
router.get("/:id", shiftAssignmentController.getShiftAssignment);

//route to update a single shift assignment by their shift id
router.put("/:id", shiftAssignmentController.updateShiftAssignment);

//route to delete a single shift assignment by their shift id
router.delete("/:id", shiftAssignmentController.deleteShiftAssignment);

module.exports = router;
