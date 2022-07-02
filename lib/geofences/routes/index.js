var express = require('express');
var router = express.Router();
var {createGeofence, getAllGeofences, getUserAllGeofences , getGeofence , updateGeofence, deleteGeofence,getAllInactiveGeofences, updateAdminGeo, activateGeofence, deactivateGeofence,} = require('../../geofences/controller');
const auth = require("../../auth-services");

router.get("/", auth.verifyUser , getUserAllGeofences);

router.get("/all", auth.verifyUser , getAllGeofences);

router.get("/allinactive", auth.verifyUser , getAllInactiveGeofences);

router.get("/:id", auth.verifyUser, getGeofence);

router.post("/", auth.verifyUser, auth.isAdminOrManager , createGeofence);

router.put("/", auth.verifyUser, auth.isAdminOrManager , updateAdminGeo);


router.delete("/:id", auth.verifyUser, auth.isAdminOrManager , deleteGeofence);
      
router.put("activate/:id", auth.verifyUser, auth.isAdminOrManager , activateGeofence);
router.put("deactivate/:id", auth.verifyUser, auth.isAdminOrManager , deactivateGeofence);
  
  

module.exports = router;


