'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.GeofenceRequest, {
        foreignKey: "userId",
      });
      User.hasMany(models.Geofence, {
        foreignKey: "userId",
      });
      User.hasMany(models.Notification, {
        foreignKey: "userId",
      });
      User.belongsTo(models.Role, {foreignKey: 'roleId', targetKey: 'names'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    roleId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};