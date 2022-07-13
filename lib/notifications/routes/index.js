var express = require('express');
var router = express.Router();
var {getUserNotifications} = require('../../notifications/controller');
const auth = require("../../auth-services");

router.get("/getUserNotifications/:id", auth.verifyUser , auth.isTeacherOrDriver , getUserNotifications);

module.exports = router;