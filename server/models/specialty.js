"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialty.hasMany(models.Staff, {
        as: "staff",
        foreignKey: {
          name: "specialtyId",
          field: "specialty_id",
        },
      });
      Specialty.hasMany(models.Record, {
        as: "record",
        foreignKey: {
          name: "specialtyId",
          field: "specialty_id",
        },
      });
    }
  }
  Specialty.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Specialty",
      tableName: "specialty",
    }
  );
  return Specialty;
};
