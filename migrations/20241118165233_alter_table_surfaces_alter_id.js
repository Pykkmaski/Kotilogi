/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable('data_surfaces', tbl => {
      tbl.dropColumn('id');
    })
    .alterTable('data_surfaces', tbl => {
      tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
