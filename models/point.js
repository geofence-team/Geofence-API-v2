"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    static associate(models) {
      Point.belongsTo(models.Geofence, {
        foreignKey: "geofenceId",
      });
    }
  }
  Point.init(
    {
      pushPointLat: DataTypes.DECIMAL(10, 8),
      pushPointLng: DataTypes.DECIMAL(11, 8),
      geofenceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Point",
    }
  );
  return Point;
};
