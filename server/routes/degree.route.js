const express = require("express");
const degreeController = require("../controllers/degree.controller");
const validate = require("../vadilators/validate");
const { degreeSchema } = require("../vadilators/degree.validator");
const router = express.Router();

//route to get all degrees
router.get("", degreeController.getAllDegrees);

//route to create a new degree
router.post("", validate(degreeSchema), degreeController.newDegree);

//route to get a single degree by their degree id
router.get("/:id", degreeController.getDegree);

//route to update a single degree by their degree id
router.put("/:id", validate(degreeSchema), degreeController.updateDegree);

//route to delete a single degree by their degree id
router.delete("/:id", degreeController.deleteDegree);

module.exports = router;
