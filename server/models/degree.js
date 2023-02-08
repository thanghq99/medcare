"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Degree extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Degree.hasMany(models.Staff, {
        as: "staff",
        foreignKey: {
          name: "degreeId",
          field: "degree_id",
        },
      });
    }
  }
  Degree.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Degree",
      tableName: "degree",
    }
  );
  return Degree;
};
