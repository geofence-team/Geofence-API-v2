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
      pushPointLat: DataTypes.DECIMAL(10, 8),
      pushPointLng: DataTypes.DECIMAL(11, 8),
      ttGeoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Point",
    }
  );
  return Point;
};
