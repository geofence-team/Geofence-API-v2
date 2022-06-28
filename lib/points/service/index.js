const { sequelize, users, point } = require("../../../models");
const models = require("../../../models");

exports.createPoint = async (pushPointLat, pushPointLng, geofenceId) => {
  try {
    const query = `INSERT INTO points(pushPointLat, pushPointLng, geofenceId) VALUES (:pushPointLat, :pushPointLng, :geofenceId);`;
    const data = await sequelize.query(query, {
      replacements: {
        pushPointLat,
        pushPointLng,
        geofenceId,
      },
      type: sequelize.QueryTypes.INSERT,
    });
    if (data[1] === 1) {
      return { code: 0, data: { id: data[0] } };
    } else {
      return { code: 1, data: "failed to add point" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

exports.updatePoint = async (id, pushPointLat, pushPointLng, geofenceId) => {
  try {
    let query = `UPDATE points 
        SET 
        pushPointLat = :pushPointLat,
        pushPointLng = :pushPointLng,
        geofenceId = :geofenceId
        WHERE
            id = :id `;
    const data = await sequelize.query(query, {
      replacements: {
        id,
        pushPointLat,
        pushPointLng,
        geofenceId,
      },
      type: sequelize.QueryTypes.UPDATE,
    });
    if (data[1] === 1) {
      return { code: 0, data: "point updated" };
    } else {
      return { code: 1, data: "failed to update point" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};


exports.deletePoint = async (id, pushPointLat, pushPointLng, geofenceId) => {
  try {
    let query = `UPDATE points 
        SET 
            deletedAt = now()
        WHERE
            id = :id `;
    const data = await sequelize.query(query, {
      replacements: {
        id,
        pushPointLat,
        pushPointLng,
        geofenceId,
      },
      type: sequelize.QueryTypes.UPDATE,
    });
    if (data[1] === 1) {
      return { code: 0, data: "point deleted" };
    } else {
      return { code: 1, data: "failed to delete point" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
