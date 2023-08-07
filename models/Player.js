const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Player extends Model {}

Player.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    position: {
      // on weekly update will take an array and then concat into one long string?
      type: DataTypes.STRING,
      allowNull: false,
    },
    // position2? - maybe have secondary position to make it easier to adapt given code?
  },
  {
    sequelize,
    modelName: "player",
  }
);

module.exports = Player;
