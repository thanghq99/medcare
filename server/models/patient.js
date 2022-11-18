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
      Patient.belongsTo(models.Account, {
        as: "account",
        foreignKey: {
          name: "accountId",
          field: "account_id",
        },
        onDelete: "CASCADE",
        hooks: true,
      });
      Patient.hasMany(models.Record);
    }
  }
  Patient.init(
    {
      healthHistory: DataTypes.STRING,
      familyHealthHistory: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
      tableName: "patient",
    }
  );
  return Patient;
};
