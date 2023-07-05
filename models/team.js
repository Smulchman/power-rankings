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
        type: DataTypes.VIRTUAL,
        get() {
            return (this.week3 + this.week2 + this.week1) / 3;
        }
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
    hooks: {
        beforeUpdate: async (newData) => {
            // move week 2 to week 3 and week 1 to week 2 (in that order)
        },
    },
    sequelize,
    modelName: "team",
  }
);

module.exports = Team;