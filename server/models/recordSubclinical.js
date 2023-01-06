"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecordSubclinical extends Model {}
  RecordSubclinical.init(
    {
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
