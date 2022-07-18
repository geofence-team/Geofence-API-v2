var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");
var axios = require("axios");

/////////GET All requests////////

async function getRequestedUsers(req, res) {
  try {
    const userId = req.user.id;
    const result = await service.getRequestedUsers(userId);
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

///////////////////////////
// async function getRequestedUsers(req, res) {
//   try {
//     // const userId = req.user.id;
//     const result = await service.getRequestedUsers();
//     if (result?.code === 0) {
//       return response.success(result?.data, res);
//     } else if (result?.code === 1) {
//       return response.failedWithMessage(result?.data, res);
//     } else {
//       return response.notAcceptable(res);
//     }
//   } catch (e) {
//     console.error(e);
//     return response.serverError(res);
//   }
// }
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
  const { id: reqId } = req.params;
  try {
    const userId = req.user.id
    const result =  await service.ApproveGeoRequest(reqId, userId);
    if (result?.code === 0) {
      const requests = await service.getRequestedUsers(userId); 
      return response.successWithMessage(result?.data, res, requests );
    } else if (result?.code === 1) {
      return response.failedWithMessage(result?.data, res);
    } else {
      return response.notAcceptable(res);
    }
  } catch (e) {
    console.error(e)
    return response.serverError(res);
  }
}


module.exports = {
  getRequestedUsers,createGeoRequest,ApproveGeoRequest};