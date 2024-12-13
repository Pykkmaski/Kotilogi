/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').alterTable('oil_vessel', tbl => {
    tbl.renameColumn('vesselVolume', 'volume');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').alterTable('oil_vessel', tbl => {
    tbl.renameColumn('volume', 'vesselVolume');
  });
};
