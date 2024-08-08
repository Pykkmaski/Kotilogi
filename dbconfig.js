require('dotenv').config();

const dbEngine = process.env.DB_ENVIRONMENT || 'development';
const config = require('./knexfile')[dbEngine];

const db = require('knex')(config);
module.exports = db;
