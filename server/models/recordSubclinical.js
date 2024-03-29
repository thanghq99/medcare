"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecordSubclinical extends Model {
    static associate(models) {
      RecordSubclinical.belongsTo(models.Record, {
        as: "record",
        foreignKey: {
          name: "recordId",
          field: "record_id",
        },
      });
      RecordSubclinical.belongsTo(models.Subclinical, {
        as: "subclinical",
        foreignKey: {
          name: "subclinicalId",
          field: "subclinical_id",
        },
      });
    }
  }
  RecordSubclinical.init(
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
      subclinicalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Subclinical",
          key: "id",
        },
      },
      currentExaminationFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "RecordSubclinical",
      tableName: "record_subclinical",
    }
  );
  return RecordSubclinical;
};
