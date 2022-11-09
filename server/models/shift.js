"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shift.belongsTo(models.Staff);
    }
  }
  Shift.init(
    {
      startTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Shift",
      tableName: "shift",
      paranoid: true,
    }
  );
  return Shift;
};
