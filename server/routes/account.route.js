const express = require("express");
const accountController = require("../controllers/account.controller");

const router = express.Router();

//route to get all accounts
router.get("", accountController.getAllAccounts);

//route to creat a new account
router.post("", accountController.newAccount);

//route to get a single account by their account id
router.get(":id", accountController.getAccount);

//route to update a single account by their account id
router.put(":id", accountController.updateAccount);

//route to delete a single account by their account id
router.delete(":id", accountController.deleteAccount);

module.exports = router;
