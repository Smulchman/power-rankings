const { getPlayers } = require("./sleeper");
const Player = require("../../models/Player");
const axios = require("axios");

async function createPlayers() {
  try {
    await Player.destroy({ where: {} });

    const data = await getPlayers();

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const item = data[key];

        // grab player information
        const { player_id, position } = item;

        // move that info into the database
        await Player.create({ id: player_id, positions: position });
      }
    }

    console.log("Data stored successfully!");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

module.exports = { createPlayers };