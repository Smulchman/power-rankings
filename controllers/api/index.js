const { getRosters, getMatchups, getPlayers } = require("./sleeper");
const { createOrUpdateTeam } = require("./teamRoutes");
const { createPlayers } = require("./playerRoutes");

module.exports = {
  createPlayers,
  createOrUpdateTeam,
  getMatchups,
  getPlayers,
  getRosters,
};
