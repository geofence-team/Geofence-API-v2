"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {

    static associate(models) {
      Notification.belongsTo(models.NotificationType);
      Notification.belongsTo(models.Geofence);
    }
  }
  Notification.init(
    {
      message: DataTypes.STRING,
      geofenceId: DataTypes.INTEGER,
      notificationTypeId: DataTypes.INTEGER,
      isOn: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
