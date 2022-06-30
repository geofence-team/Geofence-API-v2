var express = require('express');
var router = express.Router();
var {createGeofence, getAllGeofences, getUserAllGeofences , getGeofence , updateGeofence, deleteGeofence, activateGeofence, deactivateGeofence,getAllInActiveGeofences} = require('../../geofences/controller');
const auth = require("../../auth-services");

router.get("/", auth.verifyUser , getUserAllGeofences);
router.get("/all", auth.verifyUser , getAllGeofences);
router.get("/allinactive", auth.verifyUser , getAllInActiveGeofences);
router.get("/:id", auth.verifyUser, getGeofence);


router.post("/", auth.verifyUser, auth.isAdminOrManager , createGeofence);

router.put("activate/:id", auth.verifyUser, auth.isAdmin,  activateGeofence);

router.put("deactivate/:id", auth.verifyUser, auth.isAdmin,  deactivateGeofence);

router.delete("/:id", auth.verifyUser,auth.isAdmin, deleteGeofence);

module.exports = router;


// router.put("/:id", auth.verifyUser, auth.isAdmin,  updateGeofence);
