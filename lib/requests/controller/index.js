var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");
var axios = require("axios");

/////////GET All requests////////
async function getRequestedUsers(req, res) {
  try {
    // const userId = req.user.id;
    const result = await service.getRequestedUsers();
    if (result?.code === 0) {
      return response.success(result?.data, res);
    } else if (result?.code === 1) {
      return response.failedWithMessage(result?.data, res);
    } else {
      return response.notAcceptable(res);
    }
  } catch (e) {
    console.error(e);
    return response.serverError(res);
  }
}


/////////POST request////////

async function postRequestToJoin(req, res, next) {
    let userId = req?.body?.id;
    let geofenceId = req?.body?.geofenceId;
    if (!geofenceId || !userId ) {
      return response.failedWithMessage(
        "geofenceId is required",
        res
      );
    }
    
    try {
      const result = await service.postRequest(geofenceId);
      if (result?.code === 0) {
        return response.successWithMessage(result?.data, res);
      } else if (result?.code === 1) {
        return response.failedWithMessage(result?.data, res);
      } else {
        return response.notAcceptable(res);
      }
    } catch (e) {
      console.error(e);
      return response.serverError(res);
    }
  }

  async function acceptRequest(req, res, next) {
    const { isAccepted, userId } = req.body;
    console.log(req.body, "userIDDDDDDDDDDDd");
    if (isAccepted === undefined || !userId) {
      return response.failedWithMessage(
        "isAccepted,userId, are required in req body",
        res
      );
    }
    try {
      const result = await service.acceptRequest(userId, isAccepted);
  
      if (result) {
        return response.successWithMessage("User is now ", res);
      }
      return response.failedWithMessage("Could not accept this request", res);
    } catch (e) {
      return response.serverError(res);
    }
  }
  
  /////////ACCEPT request////////

  async function acceptRequest(req, res, next) {
    const { isAccepted, userId } = req.body;
    console.log(req.body, "userIDDDDDDDDDDDd");
    if (isAccepted === undefined || !userId) {
      return response.failedWithMessage(
        "isAccepted,userId, are required in req body",
        res
      );
    }
    try {
      const result = await service.acceptRequest(userId, isAccepted);
  
      if (result) {
        return response.successWithMessage("User is now ", res);
      }
      return response.failedWithMessage("Could not accept this request", res);
    } catch (e) {
      return response.serverError(res);
    }
  }


module.exports = {
  getRequestedUsers, postRequestToJoin, acceptRequest
};