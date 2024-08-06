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
      password: 'pass',
      database: 'dev_db',
    },

    pool: {
      min: 2,
      max: 112,

      idleTimeoutMillis: 3000, // Time in milliseconds before an idle connection is closed
      createTimeoutMillis: 3000, // Time in milliseconds before giving up on connection creation
      acquireTimeoutMillis: 30000, // Time in milliseconds before giving up on acquiring a connection
      reapIntervalMillis: 1000, // How often to check for idle connections (in milliseconds)
      createRetryIntervalMillis: 100,
    },

    useNullAsDefault: true,
  },

  development_pg: {
    client: 'pg',
    connection: {
      filename: './data/dev_pg.db3',
    },

    useNullAsDefault: true,
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

  render_pg: {
    client: 'pg',
    connection: process.env.RENDER_DB_URL,
    ssl: {
      sslmode: 'require',
    },

    pool: {
      min: 2,
      max: 10,
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
      max: 112,

      idleTimeoutMillis: 15000,
      reapIntervalMillis: 1000,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};
