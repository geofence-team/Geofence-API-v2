const { sequelize, User, Geofence, Point } = require("../../../models");
const models = require("../../../models");

exports.getRequestedUsers = async () => {
  try {
    const data = await models.GeofenceRequest.findAll({
      attributes: ["id", "userId", "geofenceId", "isAccepted"],
      include: [
        { model: models.User, attributes: ["id", "name", "roleId"] },
        { model: models.Geofence, attributes: ["id", "title"] },
      ],
    });
    // console.log(data, "dataGeoeeeee");
    if (data.length > 0) {
      return { code: 0, data };
    } else if (data.length === 0) {
      return { code: 0, data };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

//////////////////////////////////////////////////////////////
exports.acceptRequest = async (userId, isAccepted) => {
  console.log(userId, isAccepted, "userIDDuuuuuuuuuuu");
  try {
    let request = await models.GeofenceRequest.findOne({
      where: {
        userId,
      },
    });
    // console.log(request, "userrrrrrrrr");
    if (!request) return null;
    const result = await models.GeofenceRequest.update(
      {
        isAccepted: !request["dataValues"].isAccepted,
      },
      {
        where: {
          userId,
        },
      }
    );
    console.log(result, "resulttttttte");
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

/////////////////////////////////////////////////////////////////////////
exports.postRequest = async (geofenceId) => {
  try {
    let [result, created] = await models.GeofenceRequest.findOrCreate({
      where: {
        geofenceId,
      },
    });
    if (created) {
      return { code: 0, data: "Request sent" };
    } else {
      return { code: 1, data: "Request already sent" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
