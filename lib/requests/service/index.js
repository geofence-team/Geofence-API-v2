const { sequelize, User, Geofence, Point } = require("../../../models");
const models = require("../../../models");

exports.getRequestedUsers = async (userId) => {
    try {
      const data = await models.Geofence.findAll({
        attributes: ["id", "userId", "title", "isActive", "createdAt"],
        where: {
          userId, 
          isActive : 1
        },
        include: [
          { model: models.User, attributes: ["id", "name", "roleId"],  },
          { model: models.GeofenceRequest, attributes: ["id", "geofenceId", "isAccepted", "userId"],include: [
            { model: models.User, attributes: ["id", "name", "roleId", "email", "username"],  },
          ] },
        ],
      });
      console.log(data, "dataGeoeeeee");
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

// exports.getRequestedUsers = async () => {
//   try {
//     const data = await models.GeofenceRequest.findAll({
//       attributes: ["id", "userId", "geofenceId", "isAccepted"],
//       include: [
//         { model: models.User, attributes: ["id", "name", "roleId"] },
//         { model: models.Geofence, attributes: ["id", "title"] },
//       ],
//     });
//     // console.log(data, "dataGeoeeeee");
//     if (data.length > 0) {
//       return { code: 0, data };
//     } else if (data.length === 0) {
//       return { code: 0, data };
//     }
//   } catch (e) {
//     console.error(e);
//     throw new Error(e);
//   }
// };

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
    // select the manager for this GF
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
          await addNotfSettings(reqId, true)
          return { code: 0, data: "You have been approved" };
        }
        else {
          await addNotfSettings(reqId, false)

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
    console.error(err);
    throw new Error(err);
  }
};

const addNotfSettings = async (reqId, isAccepted = true) => {
  try {
    // query geofenceId, userId from requests based on reqId, to be used below
    let selectGeoId = `SELECT geofenceId, userId from geofencerequests where id = :reqId`
    const geoData = await sequelize.query(selectGeoId, {
      replacements: {
        reqId,
      }
    });
    const geoId = geoData?.[0]?.[0]?.geofenceId
    const userId = geoData?.[0]?.[0]?.userId
    if (isAccepted) {
      let selectUserNotfSttings = `SELECT 
      n.id AS id,
      n.notificationTypeId AS ntId,
      u.id AS userid,
      gr.id AS gfrId
  FROM
      notifications n
          JOIN
      geofencerequests gr ON n.geofenceId = :geoId AND gr.geofenceId = :geoId
          JOIN
      geofences g ON g.id = :geoId
          JOIN
      users u ON u.id = :userId
  WHERE
      g.isActive = 1 AND gr.isAccepted = 1
          AND g.deletedAt IS NULL
          AND u.roleId = 'TEACHER'
  GROUP BY n.id;`
      const notfData = await sequelize.query(selectUserNotfSttings, {
        replacements: {
          userId,
          geoId
        }
      });
      if (notfData?.[0]?.[0]?.id) {
        // update notf settings deleted at null & isOn = 1, if request was Accepted
        let updateNotfSettingsQuery = `UPDATE notifications 
      SET 
          deletedAt = NULL,
          isOn = 1
      WHERE
          userId = :userId and geofenceId = :geoId;`
        await sequelize.query(updateNotfSettingsQuery, {
          replacements: {
            geoId,
            userId,
          },
          type: sequelize.QueryTypes.UPDATE,
        });
      }
      else {
        // insert notf setting for user
        let addNotfSettingsQ = `INSERT
        INTO notifications (geofenceId, userId, notificationTypeId, isOn)
        VALUES
         (:geoId, :userId, "IN", 1 ),
         (:geoId, :userId, "OUT", 1 );`
        await sequelize.query(addNotfSettingsQ, {
          replacements: {
            userId,
            geoId
          },
          type: sequelize.QueryTypes.INSERT,
        });
      }
    }
    else {
      // update notf settings deleted at now(), if request was declined
      let updateNotfSettingsQ = `UPDATE notifications 
      SET 
          deletedAt = NOW()
          where userId = :userId and geofenceId = :geoId;`
      await sequelize.query(updateNotfSettingsQ, {
        replacements: {
          userId,
          geoId
        },
        type: sequelize.QueryTypes.UPDATE,
      });
    }
  }
  catch (e) {
    console.error(e);
    throw new Error(e);
  }
}