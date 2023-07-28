const { createOrUpdateTeam, createPlayers, getMatchups } = require("./api/index");

const updateDatabase = async () => {
    try {
        await createPlayers();
        const matchups = await getMatchups();
        for (const matchup of matchups) {
        for (const team of matchup.rosters) {
            await createOrUpdateTeam(team);
        }
        }
    } catch (error) {
        console.error("Error updating data:", error.message);
    }
}

module.exports = updateDatabase;