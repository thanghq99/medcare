const express = require("express");
const specialtyController = require("../controllers/specialty.controller");
const validate = require("../vadilators/validate");
const { specialtySchema } = require("../vadilators/specialty.validator");
const router = express.Router();

//route to get all specialties
router.get("", specialtyController.getAllSpecialties);

//route to create a new specialty
router.post("", validate(specialtySchema), specialtyController.newSpecialty);

//route to get a single specialty by their specialty id
router.get("/:id", specialtyController.getSpecialty);

//route to update a single specialty by their specialty id
router.put(
  "/:id",
  validate(specialtySchema),
  specialtyController.updateSpecialty
);

//route to delete a single specialty by their specialty id
router.delete("/:id", specialtyController.deleteSpecialty);

module.exports = router;
