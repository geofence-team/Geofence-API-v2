var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");
var axios = require('axios');
// console.log(process.env.TT_PROJ_ID, process.env.TT_API_KEY, process.env.TT_API_ADMIN_KEY)
/////////CREATE GEOFENCE////////

async function createGeofence(req, res, next) {
  const { title, isActive, description, coordinates } = req.body;
  if (!title || !coordinates) {
    return response.failedWithMessage(
      "title & coordinates are required in req body",
      res
    );
  }
  try {
    const userId = req.user.id;

    var data = JSON.stringify({
      name: title,
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates,
      },
      "properties": {
        description
      }
    });

    var config = {
      method: 'post',
      url: 'https://api.tomtom.com/geofencing/1/projects/a70fb7fa-e74b-44d5-b0c7-47a3bb905845/fence?key=EjgfZVuh2GOmFpkjSL0ucHFDEi24jxuf&adminKey=vqHHxzTwyAM8J5JdWyMuC5TpZLwfWHHFtpXcMy8fGq0YOedh',
      headers: { 
        'authority': 'api.tomtom.com', 
        'accept': 'application/json, text/plain, */*', 
        'accept-language': 'en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6', 
        'content-type': 'application/json', 
        'dnt': '1', 
        'origin': 'https://developer.tomtom.com', 
        'referer': 'https://developer.tomtom.com/', 
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"Windows"', 
        'sec-fetch-dest': 'empty', 
        'sec-fetch-mode': 'cors', 
        'sec-fetch-site': 'same-site', 
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
      },
      data : data
    };
    
    axios(config)
      .then(async function (ttResponse) {

        console.log(ttResponse.data, "tt dataaa");
        const ttGeoId = ttResponse.data.id
        try {
          const result = await service.createGeofence(
            title,
            description,
            userId,
            isActive,
            ttGeoId,
            coordinates
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
      })
      .catch(function (error) {
        console.log(error, "tt failed");
        return response.serverError(res);
      });
  } catch (e) {
    console.error(e);
    return response.serverError(res);
  }
}

////////////////////////////////////////////////

////////////GET ALL ACTIVE GEOFENCES/////////////

async function getAllGeofences(req, res) {
  try {
    const result = await service.getAllGeofences();
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



/////////GET USER'S OWN CREATED GEOFENCES/////////////

async function getUserAllGeofences(req, res) {
  try {
    const userId = req.user.id;
    const result = await service.getUserAllGeofences(userId);
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

/////////GET ONE GEOFENCE BY ID////////

async function getGeofence(req, res) {
  // const { id } = req.params;
  const id = req.user.id;
  try {
    const result = await service.getGeofence(id);
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

/////////UPDATE GEOFENCE////////

async function updateAdminGeo(req, res) {
  const { isActive, id } = req.body;
  if (isActive === undefined || !id) {
    return response.failedWithMessage(
      "isActive,id, are required in req body",
      res
    );
  }
  try {
    const result = await service.updateAdminGeo(id, isActive);

    if (result) {
      return response.successWithMessage("User is now ", res);
    }
    return response.failedWithMessage("Could not accept this request", res);
  } catch (e) {
    return response.serverError(res);
  }
}

/////////DELETE GEOFENCE////////

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
}


//////////////DEACTIVATE MY GEOFENCE////////////////////

async function deactivateGeofence(req, res, next) {
  try {
    const geofenceId = req.params.id;
    const result = await service.deactivate(geofenceId);
    if (result) {
      return response.successWithMessage("Geofence is now deactivated", res);
    }
    return response.failedWithMessage("Geofence is already deactivated", res);
  } catch (e) {
    return response.serverError(res);
  }
}

////////////ACTIVATE MY GEOFENCE/////////////////////////

async function activateGeofence(req, res, next) {
  try {
    const geofenceId = req.params.id;
    const result = await service.activate(geofenceId);
    if (result) {
      return response.successWithMessage("Geofence is now activated", res);
    }
    return response.failedWithMessage("Geofence is already active", res);
  } catch (e) {
    return response.serverError(res);
  }
}
/////////////////////////////////////////////////////////////////////////


module.exports = {
  createGeofence,
  getAllGeofences,
  getUserAllGeofences,
  getGeofence,
  deactivateGeofence,
  activateGeofence,
  deleteGeofence,
  getAllInactiveGeofences,
  updateAdminGeo
  
};


////////////GET GEOFENCES/////////////

async function getAllInactiveGeofences(req, res) {
  try {
    const result = await service.getAllinActiveGeofences();
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

// async function deactivateGeofence(req, res) {
//   const {
//     params: { id },
//     body: { title, coordinates, description },
//   } = req;
//   if (!title || !coordinates || !description) {
//     return response.failedWithMessage(
//       "title, description and coordinates are required in req body",
//       res
//     );
//   }
//   try {
//     const userId = req.user.id;
//     const result = await service.updateGeofence(
//       id,
//       userId,
//       title,
//       coordinates,
//       description
//     );
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