require('dotenv').config();

const dbEngine = process.env.DB_ENVIRONMENT || "development";
import configObj from './knexfile';
import knex from 'knex';

const config = configObj[dbEngine];

const db = knex(config);
const enableForeignKeys = async () => await db.raw('PRAGMA foreign_keys=ON');
if(dbEngine === 'development') enableForeignKeys();

export default db;