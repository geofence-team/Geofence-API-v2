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
      pushPointLat: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
      },
      pushPointLng: {
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
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable("points");
  },
};
