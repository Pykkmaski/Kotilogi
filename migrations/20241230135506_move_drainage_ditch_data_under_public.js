/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
      ALTER TABLE drainage_ditches.data RENAME TO drainage_ditch;
      ALTER TABLE drainage_ditches.drainage_ditch RENAME CONSTRAINT data_pkey TO drainage_ditch_pkey;
      ALTER TABLE drainage_ditches.drainage_ditch SET SCHEMA public;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
    ALTER TABLE drainage_ditch RENAME TO data;
    ALTER TABLE data SET SCHEMA drainage_ditches;
  `);
};
