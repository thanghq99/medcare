"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subclinical extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subclinical.belongsToMany(models.Record, {
        through: models.RecordSubclinical,
      });
    }
  }
  Subclinical.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      examinationFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Subclinical",
      tableName: "subclinical",
    }
  );
  return Subclinical;
};
