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
      // team name
      type: DataTypes.STRING,
      allowNull: true,
    },
    week: {
      // current week of the season
      type: DataTypes.INTEGER,
    },
    points_for: {
      // will set by just adding week score to previous total and returning.
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    average: {
      // if I have a 'week' field I can autocalculate it. seems necessary.
      type: DataTypes.VIRTUAL,
      get() {
        return this.points_for / this.week;
      },
    },
    week3: {
      // third most recent week
      type: DataTypes.DECIMAL(10, 2),
    },
    week2: {
      // second most recent week
      type: DataTypes.DECIMAL(10, 2),
    },
    week1: {
      // most recent week
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    week_average: {
      // average of the last three weeks
      type: DataTypes.VIRTUAL,
      get() {
        return (this.week3 + this.week2 + this.week1) / 3;
      },
    },
    perfect: {
      // needs to be calculated by function that calls update.
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ceiling: {
      // highest single week score across season.
      // automatically determined by hook.
      type: DataTypes.DECIMAL(10, 2),
    },
    floor: {
      // lowest single week score across season.
      // automatically determined by hook.
      type: DataTypes.DECIMAL(10, 2),
    },
    power: {
      // represents the calculated 'power' of the team across the season.
      type: DataTypes.VIRTUAL,
      get() {
        const average = this.getDataValue("average");
        const week2 = this.week2;
        const week1 = this.week1;
        const perfect = this.perfect;
        const ceiling = this.ceiling;
        const floor = this.floor;

        return (
          average / 3.3333333 +
          0.2 * week2 +
          0.3 * week1 +
          0.1 * perfect +
          ceiling / 12 +
          floor / 12
        );
      },
    },
  },
  {
    hooks: {
      // moves the week values back one week every week
      beforeUpdate: async (newData, options) => {
        const oldData = await options.model.findByPk(newData.id);
        newData.week3 = oldData.week2;
        newData.week2 = oldData.week1;
        return newData;
      },
      // checks the new week score against the ceiling and floor and updates them if necessary
      beforeUpdate: async (newData, options) => {
        const oldData = await options.model.findByPk(newData.id);
        if (newData.week1 > oldData.ceiling || oldData.ceiling === null) {
          newData.ceiling = newData.week1;
        }
        // not using else if so that initial values can be set for both ceiling and floor
        if (newData.week1 < oldData.floor || oldData.floor === null) {
          newData.floor = newData.week1;
        }
        return newData;
      },
    },
    sequelize,
    modelName: "team",
  }
);

module.exports = Team;
