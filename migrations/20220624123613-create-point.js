"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("points", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lat: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
      },
      lng: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false,
      },
      geofenceId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "geofences",
          },
          key: "id",
        },
        allowNull: false,
        onDelete: 'CASCADE', //if you deleted a geofence, all points related to it will be deleted too.
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("points");
  },
};
