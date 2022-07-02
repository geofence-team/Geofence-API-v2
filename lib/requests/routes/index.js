var express = require("express");
var router = express.Router();
var { getRequestedUsers , acceptRequest,createGeoRequest } = require("../../requests/controller");
const auth = require("../../auth-services");

router.post("/", auth.verifyUser,createGeoRequest);
router.get("/", auth.verifyUser, getRequestedUsers);

router.put("/acceptRequest", auth.verifyUser, auth.isAdminOrManager,acceptRequest);

module.exports = router;