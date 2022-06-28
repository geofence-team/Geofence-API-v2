const express = require("express");
var router = express.Router();
var {createPoint, updatePoint} = require("../../points/controller");
const auth = require("../../auth-services");

router.post("/", auth.verifyUser, createPoint);
router.put("/:id", auth.verifyUser, updatePoint);


module.exports = router;