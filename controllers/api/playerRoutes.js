const { getPlayers } = require("./sleeper");
const Player = require("../../models/Player");
const axios = require("axios");

async function createPlayers() {
  try {
    await Player.destroy({ where: {} });

    const data = await getPlayers();

    for (const item of Object.values(data)) {
      // Check if the position is not null and is a string
      if (item.position !== null && typeof item.position === "string") {
        try {
          // Attempt to insert the player information into the database
          await Player.create({
            id: item.player_id,
            position: item.position,
          });
        } catch (error) {
          console.error("Error storing player data:", error);
        }
      }
    }

    console.log("Data stored successfully!");
  } catch (error) {
    console.error("Error storing data:", error);
  }
}

module.exports = { createPlayers };