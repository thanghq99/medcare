const express = require("express");
const authenticationController = require("../controllers/authentication.controller");
const validate = require("../vadilators/validate");
const {
  registerSchema,
  loginSchema,
} = require("../vadilators/authentication.validator.js");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  authenticationController.register
);
router.post("/login", validate(loginSchema), authenticationController.login);

module.exports = router;
