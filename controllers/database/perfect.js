const Player = require("../../models/Player.js");

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

const getPerfectLineup = async (teamPlayers, playersPoints) => {
  const positions = {}; // Object to store the highest scoring players for each position
  let totalScore = 0; // Variable to keep track of the total score

  //   Set positions eligible to play in the FLEX slot
  const flexCandidates = ["RB", "WR", "TE"];

  for (const playerId of teamPlayers) {
    const points = playersPoints[playerId];
    if (!points) continue; // Skip players not found in the playersPoints object

    const player = await Player.findByPk(playerId);
    if (!player) continue; // Skip players not found in the database

    // Take player scores for a given position and store into an array named after that position stored within the larger 'positions' object
    if (!positions[player.position]) {
      positions[player.position] = [points];
    } else {
      positions[player.position].push(points);
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

  // Take eligible flex players and put them into an array together then sort it
  const flexTopScores = [];
  const flexSlots = getPlayerSlots("FLEX");
  for (const position of flexCandidates) {
    if (positions[position]) {
      const sortedScores = positions[position].sort((a, b) => b - a);
      const topScores = sortedScores.slice(0, flexSlots);
      flexTopScores.push(...topScores);
    }
  }

  // Sort and take the highest scores from the flexTopScores array
  flexTopScores.sort((a, b) => b - a);
  const flexScore = flexTopScores
    .slice(0, flexSlots)
    .reduce((sum, score) => sum + score, 0);

  // Add the FLEX score to the total score
  totalScore += flexScore;

  // console.log(totalScore.toFixed(2));
  return totalScore;
};

module.exports = getPerfectLineup;
