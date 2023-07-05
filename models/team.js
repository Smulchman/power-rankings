const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Team extends Model {}

Team.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    points_for: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    average: {
        type: DataTypes.DECIMAL,
    },
    week3: {
        type: DataTypes.DECIMAL,
    },
    week2: {
        type: DataTypes.DECIMAL,
    },
    week1: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    week_average: {
        type: DataTypes.DECIMAL,
    },
    perfect: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    ceiling: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    floor: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    power: {
        type: DataTypes.DECIMAL,
    },
    rank: {
        type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "team",
  }
);

module.exports = Team;