const router = require("express").Router();
const { getPlayers } = require("../../controllers/api/sleeper");
const Player = require("../../models/player");
const axios = require("axios");

async function createPlayers() {
  try {
    const response = await getPlayers;
    const data = response.data;

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const item = data[key];

        // grab player information
        const { player_id, position } = item;

        // move that info into the database
        await Player.create({ player_id, position });
      }
    }

    console.log("Data stored successfully!");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

module.exports = createPlayers();