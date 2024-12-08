/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('property').alterTable('overview', tbl => {
    tbl.dropColumn('mainColorId');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('property').alterTable('overview', tbl => {
    tbl.integer('mainColorId').references('id').inTable('ref_mainColors').onUpdate('CASCADE');
  });
};
