const express = require("express");
const router = express.Router();

// const demoRoute = require("./demo.route.js");
const accountRoute = require("./account.route.js");
const staffRoute = require("./staff.route.js");
const patientRoute = require("./patient.route.js");
const recordRoute = require("./record.route.js");
const medicineRoute = require("./medicine.route.js");
const subclinicalRoute = require("./subclinical.route.js");
const specialtyRoute = require("./specialty.route.js");
const degreeRoute = require("./degree.route.js");
const shiftRoute = require("./shift.route.js");
const shiftAssignmentRoute = require("./shiftAssignment.route.js");
const authenticationRoute = require("./authentication.route.js");

const jwtVerifying = require("../middlewares/jwtVerifying");

router.get("/", (req, res) => {
  res.json("Medcare api.");
});

// router.use("/demo", demoRoute);
router.use("/account", jwtVerifying, accountRoute);
router.use("/staff", jwtVerifying, staffRoute);
router.use("/patient", jwtVerifying, patientRoute);
router.use("/record", jwtVerifying, recordRoute);
router.use("/medicine", jwtVerifying, medicineRoute);
router.use("/subclinical", jwtVerifying, subclinicalRoute);
router.use("/specialty", jwtVerifying, specialtyRoute);
router.use("/degree", jwtVerifying, degreeRoute);
router.use("/shift", jwtVerifying, shiftRoute);
router.use("/shift-assignment", jwtVerifying, shiftAssignmentRoute);
router.use("/authentication", authenticationRoute);

module.exports = router;
