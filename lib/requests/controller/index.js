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

//CREATE GEOFENCE REQUEST//

async function createGeoRequest(req, res) {
  const {
    params: { id },
  } = req;  
  try {
    const userId = req.user.id;
    const result = await service.createGeoRequest(id, userId);
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
};

//UPDATE GEOFENCE REQUESTS//

async function ApproveGeoRequest(req, res, next) {
  const { isAccepted, userId, geofenceId } = req.body;
  if (isAccepted === undefined || !userId || !geofenceId) {
    return response.failedWithMessage(
      "isAccepted,userId, geofenceId are required in req body",
      res
    );
  }
  try {
    const result = await service.ApproveGeoRequest(userId, isAccepted, geofenceId);

    if (result) {
      if(result.approval) return response.successWithMessage("You have been approved", res);
      else return response.successWithMessage("You have been disapproved", res);
    }
    return response.failedWithMessage("Could not accept this request", res);
  } catch (e) {
    return response.serverError(res);
  }
}

module.exports = {
  getRequestedUsers,createGeoRequest,ApproveGeoRequest};