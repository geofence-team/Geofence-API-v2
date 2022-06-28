"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Geofence extends Model {
    static associate(models) {
      
      Geofence.belongsTo(models.User);
      Geofence.hasMany(models.Notification, {
        foreignKey: "geofenceId",
      });
      Geofence.hasMany(models.GeofenceRequest, {
        foreignKey: "geofenceId",
      });
      Geofence.hasMany(models.Point, {
        foreignKey: "geofenceId",
      });
    }
  }
  
  Geofence.init(
    {
      ttGeoId: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      deletedAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Geofence",
    }
  );
  return Geofence;
};
