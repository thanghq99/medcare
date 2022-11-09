const express = require("express");
const subclinicalController = require("../controllers/subclinical.controller");

const router = express.Router();

//route to get all subclinicals
router.get("", subclinicalController.getAllSubclinicals);

//route to creat a new subclinical
router.post("", subclinicalController.newSubclinical);

//route to get a single subclinical by their subclinical id
router.get(":id", subclinicalController.getSubclinical);

//route to update a single subclinical by their subclinical id
router.put(":id", subclinicalController.updateSubclinical);

//route to delete a single subclinical by their subclinical id
router.delete(":id", subclinicalController.deleteSubclinical);

module.exports = router;
