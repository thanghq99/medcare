const express = require("express");
const medicineController = require("../controllers/medicine.controller");

const router = express.Router();

//route to get all medicines
router.get("", medicineController.getAllMedicines);

//route to creat a new medicine
router.post("", medicineController.newMedicine);

//route to get a single medicine by their medicine id
router.get(":id", medicineController.getMedicine);

//route to update a single medicine by their medicine id
router.put(":id", medicineController.updateMedicine);

//route to delete a single medicine by their medicine id
router.delete(":id", medicineController.deleteMedicine);

module.exports = router;
