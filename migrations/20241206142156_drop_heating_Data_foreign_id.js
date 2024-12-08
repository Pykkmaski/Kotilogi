/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('heating')
    .alterTable('data', tbl => {
      tbl.dropForeign('id');
    })
    .raw('ALTER TABLE heating.data ALTER COLUMN id SET DEFAULT gen_random_uuid()');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex
    .withSchema('heating')
    .alterTable('data', tbl => {
      tbl.dropForeign('id');
    })
    .raw('ALTER TABLE heating.data ALTER COLUMN id SET DEFAULT gen_random_uuid()');
};
