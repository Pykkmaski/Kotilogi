/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('property').alterTable('overview', tbl => {
    tbl.dropColumn('primaryHeatingSystemId');
    tbl.dropColumn('secondaryHeatingSystemId');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('property').alterTable('overview', tbl => {
    tbl
      .integer('primaryHeatingSystemId')
      .references('id')
      .inTable('heating.types')
      .onUpdate('CASCADE');
    tbl
      .integer('secondaryHeatingSystemId')
      .references('id')
      .inTable('heating.types')
      .onUpdate('CASCADE');
  });
};
