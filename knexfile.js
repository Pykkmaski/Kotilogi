// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.db3'
    },

    useNullAsDefault: true,
  },

  development_pg: {
    client: 'pg',
    connection: {
      filename: './data/dev_pg.db3'
    },

    useNullAsDefault: true,
  },

  billing: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
      port: '5432',
      ssl: {
        sslmode: 'require',
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }

  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }

};
