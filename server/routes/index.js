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
const recordMedicineRoute = require("./recordMedicine.route.js");
const recordSubclinicalRoute = require("./recordSubclinical.route.js");
const authenticationRoute = require("./authentication.route.js");

const jwtVerifying = require("../middlewares/jwtVerifying");
const db = require("../models/index.js");
const { newAccount } = require("../services/account.service.js");

router.get("/", (req, res) => {
  res.json("Medcare api.");
});

router.get("/init-db", async (req, res) => {
  await db.sequelize.sync({ force: true });
  await newAccount({
    firstName: "admin",
    lastName: "admin",
    email: "haikhauak@gmail.com",
    password: "123",
    phoneNumber: "0111222333",
    dob: "1999/04/02",
    gender: "M",
    address: "",
    isStaff: true,
    isDisabled: false,
    degreeId: null,
    specialtyId: null,
    examinationFee: 0,
    isAdmin: true,
    healthHistory: "",
    familyHealthHistory: "",
  });
  res.json("DB initialized with one admin account");
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
router.use("/record-medicine", jwtVerifying, recordMedicineRoute);
router.use("/record-subclinical", jwtVerifying, recordSubclinicalRoute);
router.use("/authentication", authenticationRoute);

module.exports = router;
