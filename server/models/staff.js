"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Staff.belongsTo(models.Account);
      Staff.belongsTo(models.Specialty);
      Staff.hasMany(models.Record);
      Staff.hasMany(models.Shift);
    }
  }
  Staff.init(
    {
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      examinationFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Staff",
      tableName: "staff",
      paranoid: true,
    }
  );
  return Staff;
};
