const express = require("express");
const staffController = require("../controllers/staff.controller.js");

const router = express.Router();

//route to get all staffs
router.get("", staffController.getAllStaffs);

//route to creat a new staff
router.post("", staffController.newStaff);

//route to get a single staff by their staff id
router.get(":id", staffController.getStaff);

//route to update a single staff by their staff id
router.put(":id", staffController.updateStaff);

//route to delete a single staff by their staff id
router.delete(":id", staffController.deleteStaff);

module.exports = router;
