const express = require("express");
const accountController = require("../controllers/account.controller");
const validate = require("../vadilators/validate");
const {
  updateAccountSchema,
  createAccountSchema,
} = require("../vadilators/account.validator");
const router = express.Router();

//route to get all accounts
router.get("", accountController.getAllAccounts);

//route to create a new account
router.post("", validate(createAccountSchema), accountController.newAccount);

//route to get a single account by their account id
router.get("/:id", accountController.getAccount);

//route to update a single account by their account id
router.put(
  "/:id",
  validate(updateAccountSchema),
  accountController.updateAccount
);

//route to update a single account by their account id
router.post("/:id/toggleIsDisabled", accountController.toggleIsDisabled);

//route to delete a single account by their account id
router.delete("/:id", accountController.deleteAccount);

module.exports = router;
