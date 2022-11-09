"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecordSubclinicals extends Model {}
  RecordSubclinicals.init(
    {
      currentExaminationFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "RecordSubclinicals",
      tableName: "record_subclinical",
    }
  );
  return RecordSubclinicals;
};
