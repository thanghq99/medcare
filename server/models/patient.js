"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Patient.belongsTo(models.Account);
      Patient.hasMany(models.Record);
    }
  }
  Patient.init(
    {
      heathHistory: DataTypes.STRING,
      familyHealthHistory: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
      tableName: "patient",
      paranoid: true,
    }
  );
  return Patient;
};
