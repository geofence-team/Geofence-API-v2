var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");
var axios = require('axios');
/////////CREATE GEOFENCE////////
async function createGeofence(req, res, next) {
  const { title, isActive, description, coordinates } = req.body;
  if (!title || !coordinates) {
    return response.failedWithMessage("title & coordinates are required in req body", res);
  }
  try {
    const userId = req.user.id;

    var data = JSON.stringify({
      "name": title,
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        coordinates
      },
      "properties": {}
    });

    var config = {
      method: 'post',
      url: `https://api.tomtom.com/geofencing/1/projects/${process.env.TT_PROJ_ID}/fence?key=${process.env.TT_API_KEY}&adminKey=${process.env.TT_API_ADMIN_KEY}`,
      headers: {
        'authority': 'api.tomtom.com',
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json'
      },
      data
    };

    axios(config)
      .then(async function (response) {
        console.log(JSON.stringify(response.data));
        const ttGeoId = response.data.id
        try {
          const result = await service.createGeofence(title, description, userId, isActive, ttGeoId, coordinates)
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
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  catch (e) {
    console.error(e);
    return response.serverError(res);
  }
};

/////////GET USER GEOFENCE////////
async function getUserGeofences(req, res) {
  try {
    const userId = req.user.id;
    const result = await service.getUserGeofences(userId);
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
/////////GET GEOFENCE////////
async function getGeofence(req, res) {
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
/////////UPDATE GEOFENCE////////
async function updateGeofence(req, res) {
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

async function deleteGeofence(req, res) {
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