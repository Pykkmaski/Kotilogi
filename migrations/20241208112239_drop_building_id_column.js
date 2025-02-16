/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('buildings').alterTable('data', tbl => {
    tbl.dropColumn('id');
    tbl.primary('property_id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('buildings')
    .alterTable('data', tbl => {
      tbl.dropPrimary('data_pkey');
    })
    .alterTable('data', tbl => {
      tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    });
};
