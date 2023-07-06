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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    average: {
        // if I have a 'week' field I can autocalculate it. seems necessary.
      type: DataTypes.VIRTUAL,
        get() {
            return (this.points_for / this.week);
        }
    },
    week3: {
      type: DataTypes.DECIMAL(10, 2),
    },
    week2: {
      type: DataTypes.DECIMAL(10, 2),
    },
    week1: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    week_average: {
      type: DataTypes.VIRTUAL,
      get() {
        return ((this.week3 + this.week2 + this.week1) / 3);
      },
    },
    perfect: {
      // not a virtual. will have to calculate it independently and put it with update data.
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ceiling: {
      // will have to compare incoming data with current ceiling and update if necessary.
      // I think I can do this with a hook.
      type: DataTypes.DECIMAL(10, 2),
    },
    floor: {
      // will have to compare incoming data with current floor and update if necessary.
      // I think I can do this with a hook.
      type: DataTypes.DECIMAL(10, 2),
    },
    power: {
      type: DataTypes.VIRTUAL,
      get() {
        const average = this.getDataValue('average');
        const week2 = this.week2;
        const week1 = this.week1;
        const perfect = this.perfect;
        const ceiling = this.ceiling;
        const floor = this.floor;

        return ((average / 3.3333333) + (0.2 * week2) + (0.3 * week1) + (0.1 * perfect) + (ceiling / 12) + (floor / 12));
      }
    }
  },
  {
    hooks: {
      beforeUpdate: async (newData, options) => {
        const oldData = await options.model.findByPk(newData.id);
        newData.week3 = oldData.week2;
        newData.week2 = oldData.week1;
        return newData;
      },
      beforeUpdate: async (newData, options) => {
        const oldData = await options.model.findByPk(newData.id);
        if (newData.week1 > oldData.ceiling || oldData.ceiling === null) {
          newData.ceiling = newData.week1;
        }
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
