"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class geofenceRequest extends Model {
    static associate(models) {
      geofenceRequest.belongsTo(models.Geofence, {
        foreignKey: "geofenceId",
      });
      geofenceRequest.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  geofenceRequest.init(
    {
      userId: DataTypes.INTEGER,
      geofenceId: DataTypes.INTEGER,
      isAccepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "geofenceRequest",
    }
  );
  return geofenceRequest;
};
