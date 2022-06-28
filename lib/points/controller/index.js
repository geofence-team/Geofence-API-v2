var models = require("../../../models");
let service = require("../service");
const response = require("../../responses");

async function createPoint(req, res, next) {
  const { pushPointLat, pushPointLng, geofenceId } = req.body;
  if (!pushPointLat || !pushPointLng || !geofenceId) {
    return response.failedWithMessage(
      "pushPointLat, pushPointLng, geofenceId are required in req body",
      res
    );
  }
  try {
    const userId = req.user.id;
    const result = await service.createPoint(
      pushPointLat,
      pushPointLng,
      geofenceId,
      userId
    );
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

async function updatePoint(req, res) {
  const {
    params: { id },
    body: { pushPointLat, pushPointLng, geofenceId },
  } = req;
  if (!pushPointLat || !pushPointLng || !geofenceId) {
    return response.failedWithMessage(
      "pushPointLat, pushPointLng and geofenceId are required in req body",
      res
    );
  }
  try {
    const geoId = req.user.geofenceId;
    const result = await service.updatePoint(
      id,
      pushPointLat,
      pushPointLng,
      geofenceId
    );
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

module.exports = {
  createPoint,
  updatePoint,
};
