"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotificationType extends Model {
    static associate(models) {
      NotificationType.hasMany(models.Notification, {
        foreignKey: "notificationTypeId",
      });
    }
  }
  NotificationType.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NotificationType",
    }
  );
  return NotificationType;
};
