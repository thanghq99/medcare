const express = require("express");
const staffController = require("../controllers/staff.controller.js");
const validator = require("../vadilators/validate");
const { getStaffsSchema } = require("../vadilators/staff.validator");

const router = express.Router();

//route to get all staffs, using post with body for convenient, no caching needed
router.post(
  "/get-staffs",
  validator(getStaffsSchema),
  staffController.getAllStaffs
);

//route to create a new staff
router.post("", staffController.newStaff);

//route to get a single staff by their staff id
router.get("/:id", staffController.getStaff);

//route to update a single staff by their staff id
router.put("/:id", staffController.updateStaff);

//route to delete a single staff by their staff id
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
