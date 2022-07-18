var express = require('express');
var router = express.Router();
var {getUserNotifications, updateUserNotifications} = require('../../notifications/controller');
const auth = require("../../auth-services");

router.get("/getUserNotifications/:id", auth.verifyUser , auth.isTeacherOrDriver , getUserNotifications);

router.put("/updateUserNotifications/:id", auth.verifyUser , auth.isTeacherOrDriver , updateUserNotifications);

module.exports = router;