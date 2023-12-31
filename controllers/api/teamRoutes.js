const Team = require('../../models/Team');
const Player = require('../../models/Player');
const axios = require('axios');
const getPerfectLineup = require('../database/perfect');

// Fetch all teams from the database
const getTeams = async () => {
  try {
    const teams = await Team.findAll();
    return teams;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// populate table with power ranking components
const createOrUpdateTeam = async (teamData) => {
    try {
      // Find the team in the database using the rosterId
      const team = await Team.findOne({ where: { id: teamData.roster_id } });
  
      if (team) {
        // If the team exists, update its fields with new data from the API
        team.week = (team.week+1);
        team.points_for = (team.points_for + teamData.points);
        team.week1 = teamData.points;
        team.perfect = await getPerfectLineup(teamData.players, teamData.players_points);
        await team.save();
  
        console.log(`Team with rosterId ${teamData.roster_id} updated successfully.`);
      } else {
        // If the team doesn't exist, create a new team with the data from the API
        await Team.create({
          id: teamData.roster_id,
          week: 1,
          points_for: teamData.points,
          week1: teamData.points,
          perfect: await getPerfectLineup(teamData.players, teamData.players_points),
          ceiling: teamData.points,
          floor: teamData.points,
        });
  
        console.log(`Team with rosterId ${teamData.roster_id} created successfully.`);
      }
    } catch (error) {
      console.error(`Error creating or updating team with rosterId ${teamData.roster_id}:`, error.message);
    }
  };

  module.exports = { getTeams, createOrUpdateTeam };