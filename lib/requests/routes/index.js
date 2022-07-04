var express = require("express");
var router = express.Router();
var { getRequestedUsers, createGeoRequest, ApproveGeoRequest } = require("../../requests/controller");
const auth = require("../../auth-services");


router.get("/getRequestedUsers", auth.verifyUser, getRequestedUsers);

router.post("/createRequest/:id", auth.verifyUser, createGeoRequest);

router.patch("/approve/:id", auth.verifyUser, auth.isAdminOrManager, ApproveGeoRequest);


module.exports = router;

