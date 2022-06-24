"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      geofenceId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Geofences",
          },
          key: "id",
        },
        allowNull: false,
      },
      notificationTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "NotificationTypes",
          },
          key: "id",
        },
        allowNull: false,
      },
      isOn: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notifications");
  },
};
