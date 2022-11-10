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
const shiftRoute = require("./shift.route.js");
const storedShiftRoute = require("./storedShift.route.js");
const authenticationRoute = require("./authentication.route.js");

router.get("/", (req, res) => {
  res.json("Medcare api.");
});

// router.use("/demo", demoRoute);
router.use("/account", accountRoute);
router.use("/staff", staffRoute);
router.use("/patient", patientRoute);
router.use("/record", recordRoute);
router.use("/medicine", medicineRoute);
router.use("/subclinical", subclinicalRoute);
router.use("/specialty", specialtyRoute);
router.use("/shift", shiftRoute);
router.use("/storedShift", storedShiftRoute);
router.use("/authentication", authenticationRoute);

module.exports = router;
