"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GeofenceRequest extends Model {
    static associate(models) {
      GeofenceRequest.belongsTo(models.Geofence);
      GeofenceRequest.belongsTo(models.User);
    }
  }
  GeofenceRequest.init(
    {
      userId: DataTypes.INTEGER,
      geofenceId: DataTypes.INTEGER,
      isAccepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "GeofenceRequest",
    }
  );
  return GeofenceRequest;
};
