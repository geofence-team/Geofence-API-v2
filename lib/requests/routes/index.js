var express = require("express");
var router = express.Router();
var { getRequestedUsers, createGeoRequest, ApproveGeoRequest } = require("../../requests/controller");
const auth = require("../../auth-services");




router.get("/", auth.verifyUser, getRequestedUsers);

router.post("/createRequest", auth.verifyUser, createGeoRequest);

router.patch("/approverequest", auth.verifyUser, auth.isAdminOrManager, ApproveGeoRequest);


module.exports = router;

