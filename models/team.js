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
    week: {
        type: DataTypes.INTEGER,
    },
    points_for: {
      // will set by just adding week score to previous total and returning.
      // use a hook I think?
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    average: {
        // if I have a 'week' field I can autocalculate it. seems necessary.
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
      },
    },
    perfect: {
      // not a virtual. will have to calculate it independently and put it with update data.
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    ceiling: {
      // will have to compare incoming data with current ceiling and update if necessary.
      // I think I can do this with a hook.
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    floor: {
      // will have to compare incoming data with current floor and update if necessary.
      // I think I can do this with a hook.
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    power: {
      type: DataTypes.VIRTUAL,
      get() {
        // return algorithm.
      }
    },
    rank: {
      type: DataTypes.INTEGER,
    },
  },
  {
    hooks: {
      beforeUpdate: async (newData) => {
        // move week 2 to week 3 and week 1 to week 2 (in that order)
        // or, maybe I do that in external function to occur as larger update call
      },
    },
    sequelize,
    modelName: "team",
  }
);

module.exports = Team;
