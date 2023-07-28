const { createOrUpdateTeam, createPlayers, getMatchups } = require("./api/index");
const week = 3;

const updateDatabase = async () => {
    try {
        // await createPlayers();
        const matchups = await getMatchups(week);
        for (const team of matchups) {
            await createOrUpdateTeam(team);
        }
    } catch (error) {
        console.error("Error updating data:", error.message);
    }
}

module.exports = { updateDatabase };