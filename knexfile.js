// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'dev_user',
      password: process.env.DEV_DB_PASSWORD,
      database: 'Kotidok_Dev',
    },

    pool: {
      min: 0,
      max: 50,
    },
  },

  neon_pg: {
    client: 'pg',
    connection: process.env.NEON_DB_URL,
    ssl: {
      sslmode: 'require',
    },
    pool: {
      min: 2,
      max: 112,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};
