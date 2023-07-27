const { getPlayers } = require("./sleeper");
const Player = require("../../models/Player");
const axios = require("axios");

async function createPlayers() {
  try {
    await Player.destroy({ where: {} });

    const data = await getPlayers();
    const filteredData = data.filter((item) => {
      // Check if the position is not null and is a string
      return item.position !== null && typeof item.position === "string";
    });

    for (const item of filteredData) {
      // grab player information
      const { player_id, position } = item;

      // move that info into the database
      await Player.create({ id: player_id, position: position });
    }

    console.log("Data stored successfully!");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

module.exports = { createPlayers };