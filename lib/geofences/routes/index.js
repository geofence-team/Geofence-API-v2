var express = require('express');
var router = express.Router();
var {createGeofence, getUserGeofences , getGeofence , updateGeofence, deleteGeofence} = require('../../geofences/controller');
const auth = require("../../auth-services");

router.post("/", auth.verifyUser, auth.isAdminOrManager , createGeofence);
router.get("/", auth.verifyUser , getUserGeofences);
router.get("/:id", auth.verifyUser, auth.isAdmin, getGeofence);
router.put("/:id", auth.verifyUser, auth.isAdmin,  updateGeofence);
router.delete("/:id", auth.verifyUser,auth.isAdmin, deleteGeofence);

module.exports = router;