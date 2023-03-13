"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecordMedicine extends Model {
    static associate(models) {
      RecordMedicine.belongsTo(models.Record, {
        as: "record",
        foreignKey: {
          name: "recordId",
          field: "record_id",
        },
      });
      RecordMedicine.belongsTo(models.Medicine, {
        as: "medicine",
        foreignKey: {
          name: "medicineId",
          field: "medicine_id",
        },
      });
    }
  }
  RecordMedicine.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      recordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Record",
          key: "id",
        },
      },
      medicineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Medicine",
          key: "id",
        },
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "RecordMedicine",
      tableName: "record_medicine",
    }
  );
  return RecordMedicine;
};
