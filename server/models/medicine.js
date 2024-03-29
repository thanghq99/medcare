"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Medicine.belongsToMany(models.Record, {
        foreignKey: "medicineId",
        through: { model: models.RecordMedicine, unique: false },
      });
    }
  }
  Medicine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Medicine",
      tableName: "medicine",
    }
  );
  return Medicine;
};
