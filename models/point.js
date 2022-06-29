"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    static associate(models) {
      Point.belongsTo(models.Geofence);
    }
  }
  Point.init(
    {
      lat: DataTypes.DECIMAL(10, 8),
      lng: DataTypes.DECIMAL(11, 8),
      geofenceId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Point",
    }
  );
  return Point;
};
