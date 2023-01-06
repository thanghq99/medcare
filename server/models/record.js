"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Record.belongsTo(models.Patient);
      Record.belongsTo(models.Staff);
      Record.belongsToMany(models.Medicine, {
        through: "record_medicine",
      });
      Record.belongsToMany(models.Subclinical, {
        through: models.RecordSubclinical,
      });
    }
  }
  Record.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "requested",
        validate: {
          validOption: (value) => {
            const enums = ["requested", "accepted", "done", "canceled"];
            if (!enums.includes(value)) {
              throw new Error("Not a valid option");
            }
          },
        },
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
    },
    {
      sequelize,
      modelName: "Record",
      tableName: "record",
    }
  );
  return Record;
};
