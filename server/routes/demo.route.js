const express = require("express");
const demoController = require("../controllers/demo.controller");

const router = express.Router();

//route to get all demos
router.get("", demoController.getAllDemos);

//route to create a new demo
router.post("", demoController.newDemo);

//route to get a single demo by their demo id
router.get("/:id", demoController.getDemo);

//route to update a single demo by their demo id
router.put("/:id", demoController.updateDemo);

//route to delete a single demo by their demo id
router.delete("/:id", demoController.deleteDemo);

module.exports = router;
