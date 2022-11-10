const express = require("express");
const specialtyController = require("../controllers/specialty.controller");

const router = express.Router();

//route to get all specialties
router.get("", specialtyController.getAllSpecialties);

//route to create a new specialty
router.post("", specialtyController.newSpecialty);

//route to get a single specialty by their specialty id
router.get("/:id", specialtyController.getSpecialty);

//route to update a single specialty by their specialty id
router.put("/:id", specialtyController.updateSpecialty);

//route to delete a single specialty by their specialty id
router.delete("/:id", specialtyController.deleteSpecialty);

module.exports = router;
