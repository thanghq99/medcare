const express = require("express");
const authenticationController = require("../controllers/authentication.controller");
const validate = require("../vadilators/validate");
const {
  registerSchema,
  loginSchema,
} = require("../vadilators/authentication.validator.js");

const router = express.Router();

router.post("/register", authenticationController.register);
router.post("/login", authenticationController.login);
router.post("/renew-password", authenticationController.renewPassword);
router.post("/change-password", authenticationController.changePassword);

module.exports = router;
