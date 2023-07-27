const { Player, Team } = require("../../models/index.js");
const getMatchups = require("../../api/sleeper.js");

var week = 5; // this is intended to be automatically set depending on what the week of the NFL season is.
let matchups = getMatchups(week);

// Function to get the number of slots for a given position on a roster
function getPlayerSlots(position) {
  const positionSlots = {
    RB: 2,
    WR: 2,
    QB: 1,
    TE: 1,
    DST: 1,
    K: 1,
    FLEX: 1,
  };

  return positionSlots[position] || 0; // Default to 0 if position is not found in the object
}

const getPerfectLineup = async (teamPlayers) => {
  const positions = {}; // Object to store the highest scoring players for each position

  for (const playerId of teamPlayers) {
    const playerPoints = players_points[playerId];
    if (!playerPoints) continue; // Skip players not found in the players_points object

    const player = await Player.findByPk(playerId);
    if (!player) continue; // Skip players not found in the database

    // Group players by their positions
    if (!positions[player.position]) {
      positions[player.position] = [playerPoints];
    } else {
      positions[player.position].push(playerPoints);
    }
  }

  // Calculate the total score of the best players for each position
  for (const position in positions) {
    const sortedScores = positions[position].sort((a, b) => b - a); // Sort scores in descending order
    const slots = getPlayerSlots(position);

    // Take the top scores based on player slots for each position
    const topScores = sortedScores.slice(0, slots);
    totalScore += topScores.reduce((sum, score) => sum + score, 0);
  }

  // Consider the 'FLEX' position as an additional slot for the highest-scoring player from RB, WR, or TE positions
  const flexCandidates = ["RB", "WR", "TE"];
  const flexTopScores = [];
  const flexSlots = getPlayerSlots("FLEX");
  for (const position of flexCandidates) {
    if (positions[position]) {
      const sortedScores = positions[position].sort((a, b) => b - a);
      const topScores = sortedScores.slice(0, flexSlots);
      flexTopScores.push(...topScores);
    }
  }

  // Sort and take the highest score from the flexTopScores array
  flexTopScores.sort((a, b) => b - a);
  const flexScore = flexTopScores
    .slice(0, flexSlots)
    .reduce((sum, score) => sum + score, 0);

  // Add the highest FLEX score to the total score
  totalScore += flexScore;

  return totalScore;
};

// now loop through the matchup data to run getPerfectLineup on each team and then store the returned value in the database