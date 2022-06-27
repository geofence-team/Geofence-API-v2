"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Geofence extends Model {
    static associate(models) {
      
      Geofence.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Geofence.hasMany(models.Notification, {
        foreignKey: "geofenceId",
      });
      Geofence.hasMany(models.geofenceRequest, {
        foreignKey: "geofenceId",
      });
      Geofence.hasMany(models.Point, {
        foreignKey: "geofenceId",
      });
    }
  }
  
  Geofence.init(
    {
      title: DataTypes.STRING,
      geoCenterLat: DataTypes.DECIMAL(10, 8),
      geoCenterLng: DataTypes.DECIMAL(11, 8),
      deletedAt: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Geofence",
    }
  );
  return Geofence;
};
