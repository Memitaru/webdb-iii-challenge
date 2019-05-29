const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cohortsRouter = require('./cohortsRouter.js')
const studentsRouter = require('./studentsRouter.js');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;