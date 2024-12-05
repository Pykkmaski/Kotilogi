/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
      ALTER TABLE oil_heating.vessels SET SCHEMA heating;
      ALTER TABLE heating.vessels RENAME TO oil_vessel;
      DROP SCHEMA oil_heating;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
    CREATE SCHEMA oil_heating;
    ALTER TABLE heating.oil_vessel SET SCHEMA oil_heating;
    ALTER TABLE oil_heating.oil_vessel RENAME TO vessels;
    
  `);
};
