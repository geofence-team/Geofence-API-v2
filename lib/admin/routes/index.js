var express = require('express');
var router = express.Router();
var { admninSignIn, adminSignOut, activate, deactivate, getUsers, signupRequests, activateGeofence, deactivateGeofence, isManager, isAdminOrManager} = require('../../admin/controller');
const auth = require("../../auth-services");


router.post('/signin', admninSignIn)
router.post('/signout', adminSignOut);

router.get('/getusers', auth.verifyUser,  auth.isAdminOrManager, getUsers);

router.get('/signuprequests', auth.verifyUser, auth.isAdmin, signupRequests);
router.patch('/activate/:id' , auth.verifyUser , auth.isAdminOrManager, activate);
router.patch('/deactivate/:id' , auth.verifyUser , auth.isAdminOrManager, deactivate);
router.patch('/activateGeofence/:id' , auth.verifyUser , auth.isAdminOrManager, activateGeofence);
router.patch('/deactivateGeofence/:id' , auth.verifyUser , auth.isAdminOrManager, deactivateGeofence);



module.exports = router;