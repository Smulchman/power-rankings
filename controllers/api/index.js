const { getRosters, getMatchups, getPlayers } = require("./sleeper");
const { getTeams, createOrUpdateTeam } = require("./teamRoutes");
const { createPlayers } = require("./playerRoutes");

module.exports = {
  createPlayers,
  getTeams,
  createOrUpdateTeam,
  getMatchups,
  getPlayers,
  getRosters,
};
