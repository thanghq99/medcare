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
      Staff.belongsTo(models.Account, {
        as: "account",
        foreignKey: {
          name: "accountId",
          field: "account_id",
        },
        onDelete: "CASCADE",
        hooks: true,
      });
      Staff.belongsTo(models.Specialty, {
        as: "specialty",
        foreignKey: {
          name: "specialtyId",
          field: "specialty_id",
        },
      });
      Staff.hasMany(models.Record, {
        as: "record",
        foreignKey: {
          name: "staffId",
          field: "staff_id",
        },
      });
      Staff.belongsToMany(models.Shift, {
        foreignKey: "staffId",
        unique: false,
        through: { model: models.ShiftAssignment, unique: false },
      });
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
    }
  );
  return Staff;
};
