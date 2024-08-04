// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.db3',
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
      max: 10,
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
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};
