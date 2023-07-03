// API helper for Sleeper API

const axios = require("axios");

async function getRosters() {
  try {
    const response = await axios.get(
      "https://api.sleeper.app/v1/league/859465702640300032/rosters"
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getRosters };