const knex = require('knex');
const router = require('express').Router();

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);



module.exports = router;