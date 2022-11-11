const express = require("express");
const subclinicalController = require("../controllers/subclinical.controller");
const validate = require("../vadilators/validate");
const { subclinicalSchema } = require("../vadilators/subclinical.validator");
const router = express.Router();

//route to get all subclinicals
router.get("", subclinicalController.getAllSubclinicals);

//route to create a new subclinical
router.post(
  "",
  validate(subclinicalSchema),
  subclinicalController.newSubclinical
);

//route to get a single subclinical by their subclinical id
router.get("/:id", subclinicalController.getSubclinical);

//route to update a single subclinical by their subclinical id
router.put(
  "/:id",
  validate(subclinicalSchema),
  subclinicalController.updateSubclinical
);

//route to delete a single subclinical by their subclinical id
router.delete("/:id", subclinicalController.deleteSubclinical);

module.exports = router;
