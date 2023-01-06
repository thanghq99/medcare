"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShiftAssignment extends Model {
    static associate(models) {
      ShiftAssignment.belongsTo(models.Staff, {
        as: "staff",
        foreignKey: {
          name: "staffId",
          field: "staff_id",
        },
      });
      ShiftAssignment.belongsTo(models.Shift, {
        as: "shift",
        foreignKey: {
          name: "shiftId",
          field: "shift_id",
        },
      });
    }
  }
  ShiftAssignment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      staffId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Staff",
          key: "id",
        },
      },
      shiftId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Shift",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      indexes: [
        {
          name: "unique_index",
          unique: true,
          fields: ["staff_id", "shift_id", "date"],
        },
      ],
      modelName: "ShiftAssignment",
      tableName: "shift_assignment",
    }
  );
  return ShiftAssignment;
};
