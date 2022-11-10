const express = require("express");
const authenticationController = require("../controllers/authentication.controller");
const validator = require("../vadilators/validator");
const {
  registerSchema,
  loginSchema,
} = require("../vadilators/authentication.validator");

const router = express.Router();

router.post(
  "/register",
  validator(registerSchema),
  authenticationController.register
);
router.post("/login", validator(loginSchema), authenticationController.login);

module.exports = router;
