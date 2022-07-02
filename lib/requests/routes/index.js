var express = require("express");
var router = express.Router();
var { getRequestedUsers , postRequestToJoin, acceptRequest } = require("../../requests/controller");
const auth = require("../../auth-services");


router.get("/", auth.verifyUser, getRequestedUsers);

router.post(
  "/acceptRequest",
  auth.verifyUser,
  auth.isAdminOrManager,
  postRequestToJoin
);

router.put(
  "/acceptRequest",
  auth.verifyUser,
  auth.isAdminOrManager,
  acceptRequest
);



module.exports = router;