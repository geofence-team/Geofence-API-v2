const { sequelize, users, geofence } = require("../../../models");
const models = require("../../../models");

exports.createGeofence = async (title, geoCenterLat, geoCenterLng, userId) => {
  try {
    const query = `INSERT INTO geofences (title, geoCenterLat, geoCenterLng, userId) VALUES (:title, :geoCenterLat, :geoCenterLng, :userId);`;
    const data = await sequelize.query(query, {
      replacements: {
        title,
        geoCenterLat,
        geoCenterLng,
        userId,
      },
      type: sequelize.QueryTypes.INSERT,
    });
    if (data[1] === 1) {
      return { code: 0, data: { id: data[0] } };
    } else {
      return { code: 1, data: "failed to add geofence" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

exports.getUserGeofences = async (userId) => {
  try {
    const data = await models.Geofence.findAll({
      where: { userId: userId, deletedAt: null },
    });
    // console.log(data)
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

exports.getGeofence = async (id, userId) => {
  try {
    const query = `SELECT 
      t.id,
      t.title,
      t.geoCenterLat,
      t.geoCenterLat,
      t.createdAt,
      u.name,
      u.username,
      u.email
  FROM
      geofences t
          JOIN
      users u ON t.userId = u.id
  WHERE
      t.userId = :userId AND t.id = :id
          AND t.deletedAt IS NULL;`;
    const data = await sequelize.query(query, {
      replacements: {
        userId,
        id,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    if (data.length > 0) {
      return { code: 0, data: data };
    } else if (data.length === 0) {
      return { code: 1, data: "geofence not found" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

exports.updateGeofence = async (
  id,
  userId,
  title,
  geoCenterLat,
  geoCenterLng
) => {
  try {
    let query = `UPDATE geofences 
      SET 
          title = :title,
          geoCenterLat = :geoCenterLat,
          geoCenterLng = :geoCenterLng
      WHERE
          id = :id AND userId = :userId;`;
    const data = await sequelize.query(query, {
      replacements: {
        id,
        userId,
        title,
        geoCenterLat,
        geoCenterLng,
      },
      type: sequelize.QueryTypes.UPDATE,
    });
    if (data[1] === 1) {
      return { code: 0, data: "geofence updated" };
    } else {
      return { code: 1, data: "failed to update geofence" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

exports.deleteGeofence = async (id, userId) => {
  try {
    let query = `UPDATE geofences 
      SET 
            isActive = 0 ,
          deletedAt = now()
      WHERE
          id = :id AND userId = :userId;`;
    const data = await sequelize.query(query, {
      replacements: {
        id,
        userId,
      },
      type: sequelize.QueryTypes.UPDATE,
    });
    if (data[1] === 1) {
      return { code: 0, data: "geofence deleted" };
    } else {
      return { code: 1, data: "failed to delete geofence" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
