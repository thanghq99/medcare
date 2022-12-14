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
      Record.belongsTo(models.Patient, {
        as: "patient",
        foreignKey: {
          name: "patientId",
          field: "patient_id",
        },
      });
      Record.belongsTo(models.Staff, {
        as: "staff",
        foreignKey: {
          name: "staffId",
          field: "staff_id",
        },
      });
      Record.belongsTo(models.Specialty, {
        as: "specialty",
        foreignKey: {
          name: "specialtyId",
          field: "specialty_id",
        },
      });
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
      appointmentTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clinicalInformation: {
        type: DataTypes.STRING,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bloodPressure: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      heartRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      respirationRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      temperature: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        defaultValue: 0,
      },
      diagnose: {
        type: DataTypes.STRING,
      },
      treatmentDirection: {
        type: DataTypes.STRING,
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
