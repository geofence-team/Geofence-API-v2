const { sequelize, User, Notifications} = require('../../../models');
const models = require("../../../models");

///GET NOTIFCITIONS BY GEOID BY TEACHER SERVICE///

exports.getUserNotifications = async (geofenceId, userId) => {
  try {
    const query = `SELECT 
    id, geofenceId, userId, notificationTypeId, isOn
    FROM
    notifications
    WHERE
    geofenceId = :geofenceId;`;
    const data = await sequelize.query(query, {
      replacements: {
        geofenceId,
        
      },
      type: sequelize.QueryTypes.SELECT,
    });
    if (data.length > 0) {
      return { code: 0, data: data };
    } else if (data.length === 0) {
      return { code: 1, data: "notification not found" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};