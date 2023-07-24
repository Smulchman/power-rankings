const { getRosters, getMatchups, getPlayers } = require("./sleeper");

const { createPlayers } = require("./playerRoutes");

module.exports = { createPlayers, getMatchups, getPlayers, getRosters };
