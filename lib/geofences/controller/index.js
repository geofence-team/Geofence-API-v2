var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");

async function createGeofence (req, res, next) {
  const { title, geoCenterLat, geoCenterLng, isActive} = req.body;
  if (!title || !geoCenterLat || !geoCenterLng) {
    return response.failedWithMessage("title, geoCenterLat, geoCenterLng are required in req body", res);
  }
      try {
        const userId = req.user.id;
        const result = await service.createGeofence(title, geoCenterLat, geoCenterLng, userId, isActive);
        if (result?.code === 0) {
          return response.success(result?.data, res);
        } else if (result?.code === 1 ) {
          return response.failedWithMessage(result?.data, res);
        } else {
          return response.notAcceptable(res);
        }
      } catch (e) {
        console.error(e);
        return response.serverError(res);
      }
};


async function getUserGeofences (req, res)  {
  try {
    const userId = req.user.id;
    const result = await service.getUserGeofences(userId);
    if (result?.code === 0) {
      return response.success(result?.data, res);
    } else if (result?.code === 1){
      return response.failedWithMessage(result?.data, res);
    } else {
      return response.notAcceptable(res);
    }
  } catch (e) {
    console.error(e);
    return response.serverError(res);
  }
};

async function getGeofence (req, res){
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await service.getGeofence(id, userId);
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

async function updateGeofence (req, res) {
  const {
    params: { id },
    body: { title, geoCenterLat, geoCenterLng },
  } = req;
  if (!title || !geoCenterLat || !geoCenterLng) {
    return response.failedWithMessage(
      "title, geoCenterLat and geoCenterLng are required in req body",
      res
    );
  }
  try {
    const userId = req.user.id;
    const result = await service.updateGeofence(
      id,
      userId,
      title,
      geoCenterLat,
      geoCenterLng
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
};

async function deleteGeofence (req, res){
  const {
    params: { id },
  } = req;
  try {
    const userId = req.user.id;
    const result = await service.deleteGeofence(id, userId);
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


module.exports = {
  createGeofence,
  getUserGeofences,
  getGeofence,
  updateGeofence,
  deleteGeofence
};