var express = require("express");
var router = express.Router();
var { getRequestedUsers, createGeoRequest, ApproveGeoRequest } = require("../../requests/controller");
const auth = require("../../auth-services");


router.get("/getRequestedUsers", auth.verifyUser,auth.isAdminOrManager, getRequestedUsers);

router.post("/createRequest/:id", auth.verifyUser, auth.isTeacherOrDriver, createGeoRequest);

router.put("/approve/:id", auth.verifyUser, auth.isAdminOrManager, ApproveGeoRequest);


module.exports = router;

