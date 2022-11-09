"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Records", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["requested", "accepted", "done", "canceled"],
        defaultValue: "requested",
      },
      appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clinicalInformation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bloodPressure: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      heartRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      respirationRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      temperature: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
      },
      diagnose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      treatmentDirection: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Records");
  },
};
