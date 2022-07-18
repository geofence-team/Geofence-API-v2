const { sequelize, User, Notifications} = require('../../../models');
const models = require("../../../models");

///GET NOTIFCITIONS BY GEOID BY TEACHER SERVICE///

exports.getUserNotifications = async (geofenceId) => {
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

///UPDATE NOTIFCITIONS BY TEACHER SERVICE///

exports.updateUserNotifications = async (nId,isOn,notificationTypeId) => {
  try {
    // select teacher notification type
    let qu = `SELECT id, isOn, notificationtypeId FROM notifications
    WHERE id = :nId
    AND isOn = :isOn AND notificationTypeId = 'IN'`
    const data = await sequelize.query(qu, {
      replacements: {
        nId, // notification id
        isOn,
        notificationTypeId
      },
      type: sequelize.QueryTypes.SELECT,
    });
      let notisOn = await models.Notifications.findByPk(nId);
      if (!notisOn) return {code: 1, data: "noti is not found"}
      const result = await models.Notifications.update(
        {
          isOn: !notisOn["dataValues"].isOn,
        },
        {
          where: {
            id: nId,
            isOn: isOn
          },
        }
      );
    
    // if (data.length > 0) {
    //   return { code: 0, data: data };
    // } else if (data.length === 0) {
    //   return { code: 1, data: "notification update not possible" };
    // }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};