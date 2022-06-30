var express = require('express');
var router = express.Router();
var { admninSignIn, adminSignOut, activate, deactivate, getUsers} = require('../../admin/controller');
const auth = require("../../auth-services");


router.post('/signin', admninSignIn)

router.post('/signout', adminSignOut);

router.get('/getusers', auth.verifyUser, auth.isAdmin,  getUsers);

router.patch('/activate/:id' , auth.verifyUser , auth.isAdmin, activate);

router.patch('/deactivate/:id' , auth.verifyUser , auth.isAdmin, deactivate);


module.exports = router;