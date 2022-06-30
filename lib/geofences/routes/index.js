var express = require('express');
var router = express.Router();
var {createGeofence, getUserGeofences , getGeofence , deactivateGeo , activateGeofence} = require('../../geofences/controller');
const auth = require("../../auth-services");

router.post("/", auth.verifyUser, auth.isAdminOrManager , createGeofence);
router.get("/", auth.verifyUser , getUserGeofences);
router.get("/:id", auth.verifyUser, auth.isAdmin, getGeofence);

router.patch('/activate/:id' , auth.verifyUser , auth.isAdmin, activateGeofence);
router.patch('/deactivate/:id' , auth.verifyUser , auth.isAdmin, deactivateGeo);

module.exports = router;