// API helper for Sleeper API
const axios = require("axios");

async function getRosters() {
  try {
    const response = await axios.get(
      "https://api.sleeper.app/v1/league/859465702640300032/rosters"
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getMatchups(week) {
  try {
    const response = await axios.get(
      `https://api.sleeper.app/v1/league/859465702640300032/matchups/${week}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getPlayers() {
  try {
    const response = await axios.get(
      `https://api.sleeper.app/v1/players/nfl`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getRosters, getMatchups, getPlayers };