"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasOne(models.Staff, {
        as: "staffDetails",
        foreignKey: {
          name: "accountId",
          field: "account_id",
        },
        onDelete: "CASCADE",
        hooks: true,
      });
      Account.hasOne(models.Patient, {
        as: "patientDetails",
        foreignKey: {
          name: "accountId",
          field: "account_id",
        },
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Account.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      address: DataTypes.STRING,
      isStaff: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isDisabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "account",
    }
  );
  return Account;
};
