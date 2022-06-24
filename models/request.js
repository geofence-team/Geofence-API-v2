"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      Request.belongsTo(models.Geofence, {
        foreignKey: "geofenceId",
      });
      Request.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Request.init(
    {
      userId: DataTypes.INTEGER,
      geofenceId: DataTypes.INTEGER,
      isAccepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
