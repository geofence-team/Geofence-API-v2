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


/////////////////////////////////////////////////////////////////////////

exports.createGeoRequest = async (geofenceId, userId) => {
  try {
    let q1 = `SELECT * from geofencerequests where userId = :userId and geofenceId = :geofenceId`
    const query = `INSERT INTO geofencerequests
                   (geofenceId, userId)
                   VALUES (:geofenceId, :userId);`;
    const validate = await sequelize.query(q1, {
      replacements: {
        geofenceId,
        userId,
      }
    });
    if (!validate?.[0]?.[0]?.id) {
      const data = await sequelize.query(query, {
        replacements: {
          geofenceId,
          userId,
        },
        type: sequelize.QueryTypes.INSERT,
      });
      if (data[1] === 1) {
        return { code: 0, data: { id: data[0] } };
      } else {
        return { code: 1, data: "failed to add request" };
      }
    }
    else {
      return { code: 1, data: "you already sent a request to this geofence" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
///////////////////////////////

///PROCESS GEOFENCE REQUEST///
exports.ApproveGeoRequest = async (reqId, userId) => {
  try {
    let q1 = `SELECT 
    g.id, g.userId
FROM
    geofencerequests gr
        JOIN
    geofences g ON gr.geofenceId = g.id
WHERE
    g.userId = :userId AND gr.id = :reqId;`

    const validate = await sequelize.query(q1, {
      replacements: {
        reqId,
        userId,
      }
    });
    if (validate[0]?.[0]?.id) {
      let request = await models.GeofenceRequest.findByPk(reqId);
      if (!request) return { code: 1, data: "request id not found" };
      const result = await models.GeofenceRequest.update(
        {
          isAccepted: !request["dataValues"].isAccepted,
        },
        {
          where: {
            id: reqId
          },
        }
      );
      if (Array.isArray(result) && result.length > 0) {
        if (!request["dataValues"].isAccepted) {
          return { code: 0, data: "You have been approved" };
        }
        else {
          return { code: 0, data: "You have been disapproved" };
        }
      }
      else {
        return { code: 1, data: "failed to update status" };
      }
    }
    else {
      return { code: 1, data: "Unauthorized " };
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};