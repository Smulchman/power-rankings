const router = require('express').Router();
const { getMatchups } = require('./sleeper');

const Team = require('../../models/team');